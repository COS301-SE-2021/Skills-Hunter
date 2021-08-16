using SkillsHunterAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Skill.Response;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Services
{
    public interface IAdminService
    {
        Task<Skill> CreateSkill(Skill skill);
        Task<Skill> GetSkill(Guid id);
        Task<List<Skill>> GetSkills();
        Task<Skill> RemoveSkill(Guid id);
        Task<Skill> UpdateSkill(Guid id,Skill skill);
        Task<IEnumerable<ProjectSkillCollection>> GetSkillCollections();
        Task<Category> AddCategory(Category category);
        Task<Category> GetCategory(Guid id);
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> UpdateCategory(Guid id,Category category);
        Task<Category> RemoveCategory(Guid id);
        Task<GetSkillCollectionResponse> getSkillCollectionById(Guid id);
        Task<IEnumerable<GetSkillCollectionResponse>> getAllSkillCollections();
        Task AddCategoriesToSkill(Guid skillId, List<GetCategoryByIdRequest> categories);
    }
}
