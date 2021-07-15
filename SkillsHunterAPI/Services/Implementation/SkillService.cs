using SkillsHunterAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;

namespace SkillsHunterAPI.Services
{
    public class SkillService : ISkillService
    {
        public Task AddSkill(string name)
        {
            throw new NotImplementedException();
        }

        public Task<Skill> GetSkill(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Skill>> GetSkills()
        {
            throw new NotImplementedException();
        }

        public Task RemoveSkill(Guid SkillId)
        {
            throw new NotImplementedException();
        }

    }
}
