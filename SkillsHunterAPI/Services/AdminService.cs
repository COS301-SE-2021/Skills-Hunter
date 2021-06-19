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
            return skill;
        }

        public async Task<Skill> RemoveSkill(Guid id){
            return new Skill();
        }

        public async Task<Project> RemoveProject(Guid id){
            return new Project();
        }

        public async Task<Category> AddCategory(Category category){
            return category;
        }
    }
}
