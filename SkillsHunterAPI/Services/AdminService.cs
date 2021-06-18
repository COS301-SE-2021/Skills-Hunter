using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;
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
    }
}
