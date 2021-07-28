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
        Skill AddSkill(Skill skill);
        Task<Skill> GetSkill(Guid id);
        Task<List<Skill>> GetSkills();
        Task<Skill> RemoveSkill(Guid id);
        Task<Skill> UpdateSkill(Guid id,Skill skill);
        Task<IEnumerable<SkillCollection>> GetSkillCollections();
        Category AddCategory(Category category);
        Task<Category> GetCategory(Guid id);
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> UpdateCategory(Guid id,Category category);
        Task<Category> RemoveCategory(Guid id);
    }
}
