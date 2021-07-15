using SkillsHunterAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;

namespace SkillsHunterAPI.Services
{
    public interface ISkillService
    {
        Task<IEnumerable<Skill>> GetSkills();

        Task<Skill> GetSkill(Guid id);
        
        Task AddSkill(String name);
        
        Task RemoveSkill(Guid SkillId);
    

    }
}
