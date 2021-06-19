using System;
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

        public AdminService(ApplicationDbContext context){
            _context = context;
        }

        public async Task<Skill> AddSkill(Skill skill){
            skill.SkillId = new Guid();
            
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return skill;
        }

        public async Task<Skill> RemoveSkill(Guid id){
            var result = await _context.Skills.FindAsync(id);

            _context.Skills.Remove(result);
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Project> RemoveProject(Guid id){
            return new Project();
        }

        public async Task<Category> AddCategory(Category category){
            category.CategoryId = new Guid();
            
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }
    }
}
