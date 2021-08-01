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

        public Skill AddSkill(Skill skill)
        {
            skill.SkillId = new Guid();
            
            _context.Skills.Add(skill);
            _context.SaveChanges();

            return skill;
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

        public Category AddCategory(Category category)
        {
            category.CategoryId = new Guid();

            if (_context.Categories.Any(x => x.Name == category.Name))
                throw new Exception("Category with name '" + category.Name + "' already exists");

            _context.Categories.Add(category);
            _context.SaveChanges();

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
                result.CategoryId = skill.CategoryId;

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
