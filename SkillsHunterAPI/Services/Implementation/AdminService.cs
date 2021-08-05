using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;
using System.Collections.Generic;
using SkillsHunterAPI.Data;

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

            if(string.IsNullOrEmpty(skill.Name))
                throw new Exception("Name is required.");
                
            if(_context.Skills.Any(x => x.Name == skill.Name))
                throw new Exception("Skill with name '" + skill.Name + "' already exists");
            
            var checkCategory = await _context.Categories.FindAsync(skill.CategoryId);

            if(checkCategory == null)
                throw new Exception("Category does not exist.");

            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return skill;
        }

        public async Task<Skill> RemoveSkill(Guid id)
        {
            var result = await _context.Skills.FindAsync(id);

            if(result == null)
                throw new Exception("Skill with id '" + id.ToString() + "' does not exist");
            
            _context.Skills.Remove(result);
            await _context.SaveChangesAsync();
            
            return result;
        }

        public async Task<Category> AddCategory(Category category)
        {
            category.CategoryId = new Guid();

            if(string.IsNullOrEmpty(category.Name))
                throw new Exception("Name is required.");
                
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

            if(skill.CategoryId != null)
            {
                if(_context.Skills.Any(x => x.CategoryId == skill.CategoryId))
                    result.CategoryId = skill.CategoryId;
                else
                {
                    throw new Exception("Category with id '" + skill.CategoryId + "' does not exist");
                }
            }

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
    }
}
