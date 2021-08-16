using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;
using System.Collections.Generic;
using SkillsHunterAPI.Data;
using SkillsHunterAPI.Models.Skill.Response;
using SkillsHunterAPI.Models.Skill.Entity;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Services
{
    public class AdminService: IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Skill> GetSkill(Guid id)
        {
            Skill result = await _context.Skills.FindAsync(id);

            if(result == null)
                throw new Exception("Skill with id '" + id.ToString() + "' does not exist");

            return result;
        }

        public async Task<List<Skill>> GetSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        public async Task<Skill> AddSkill(Skill skill)
        {
            skill.SkillId = new Guid();
            
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return skill;
        }

        public async Task AddCategoriesToSkill(Guid skillId, List<GetCategoryByIdRequest> categories)
        {
            Skill skill = _context.Skills.Where(s => s.SkillId == skillId).FirstOrDefault();

            if (skill == null)
            {
                return;
            }

            foreach (GetCategoryByIdRequest category in categories)
            {
                SkillCategory skillCategory = new SkillCategory();
                skillCategory.SkillCategoryId = new Guid();
                skillCategory.SkillId = skill.SkillId;
                skillCategory.CategoryId = category.CategoryId;

                _context.SkillCategories.Add(skillCategory);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<Skill> RemoveSkill(Guid id)
        {
            var result = await _context.Skills.FindAsync(id);

            if(result != null)
            {
                _context.Skills.Remove(result);
            }
            
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Category> AddCategory(Category category)
        {
            category.CategoryId = new Guid();

            if (_context.Categories.Any(x => x.Name == category.Name))
                throw new Exception("Category with name '" + category.Name + "' already exists");

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<IEnumerable<ProjectSkillCollection>> GetSkillCollections()
        {
            return await _context.ProjectSkillCollections.ToListAsync();
        }

        public async Task<Skill> UpdateSkill(Guid id,Skill skill)
        {
            Skill result = await _context.Skills.FindAsync(id);
            
            if(result == null)
                throw new Exception("Skill with id '" + id.ToString() + "' does not exist");

            if(!string.IsNullOrEmpty(skill.Name))
                result.Name = skill.Name;

            //if(skill.CategoryId != null)
              //  result.CategoryId = skill.CategoryId;

            result.Status = skill.Status;

            await _context.SaveChangesAsync();

            return result;
        }

        public async Task<Category> GetCategory(Guid id)
        {
            Category result = await _context.Categories.FindAsync(id);

            if(result == null)
                throw new Exception("Category with id '" + id.ToString() + "' does not exist");

            return result;               
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> UpdateCategory(Guid id,Category category)
        {
            Category result = await _context.Categories.FindAsync(id);

            if(result == null)
                throw new Exception("Category with id '" + id.ToString() + "' does not exist");

            if(!string.IsNullOrEmpty(category.Name))
                result.Name = category.Name;

            if(!string.IsNullOrEmpty(category.Description))
                result.Description = category.Description;

            await _context.SaveChangesAsync();

            return result;             
        }

        public async Task<Category> RemoveCategory(Guid id)
        {
            var result = await _context.Categories.FindAsync(id);

            if(result == null)
                throw new Exception("Category with id '" + id.ToString() + "' does not exist");
            
            _context.Categories.Remove(result);
            await _context.SaveChangesAsync();
            
            return result;
        }

        public async Task<GetSkillCollectionResponse> getSkillCollectionById(Guid id)
        {
            SkillCollection skillCollection = _context.SkillCollections.Where(sk => sk.SkillCollectionId == id).FirstOrDefault();

            if (skillCollection != null)
            {
                GetSkillCollectionResponse response = new GetSkillCollectionResponse();
                response.SkillCollectionId = skillCollection.SkillCollectionId;
                response.Name = skillCollection.Name;
                response.Description = skillCollection.Description;

                //Adding the skills of the SkillCollection
                List<SkillCollectionMap> skillCollectionMaps = _context.SkillCollectionMaps.Where(skm => skm.SkillCollectionId == skillCollection.SkillCollectionId).ToList();

                foreach (SkillCollectionMap skillCollectionMap in skillCollectionMaps)
                {
                    Skill skill = _context.Skills.Where(s => s.SkillId == skillCollectionMap.SkillId).FirstOrDefault();

                    if (skill != null)
                    {
                        GetSkillResponse getSkill = new GetSkillResponse();
                        getSkill.Id = skill.SkillId;
                        getSkill.Name = skill.Name;
                        response.Skills.Add(getSkill);
                    }
                }

                return response;
            }

            return null;
        }

        public async Task<IEnumerable<GetSkillCollectionResponse>> getAllSkillCollections()
        {
            List<GetSkillCollectionResponse> response = new List<GetSkillCollectionResponse>();

            List<SkillCollection> skillCollections = _context.SkillCollections.ToList();

            foreach (SkillCollection skillCollection in skillCollections)
            {
                GetSkillCollectionResponse getSkillCollection = await getSkillCollectionById(skillCollection.SkillCollectionId);

                if (getSkillCollection != null)
                {
                    response.Add(getSkillCollection);
                }
            }

            return response;
        }
    }
}
