using SkillsHunterAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;

namespace SkillsHunterAPI.Services
{
    public interface IAdminService
    {
        Task<Skill> AddSkill(Skill skill);
        Task<List<Skill>> GetSkills();
        Task<Category> AddCategory(Category category);
        Task<Skill> RemoveSkill(Guid id);
    }
}
