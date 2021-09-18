using System;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Models.User.Response;
using SkillsHunterAPI.Models.Project.Response;

namespace SkillsHunterAPI.Services
{
    public interface IUserService
    {
        User Create(User request,string password);
        
        User Authenticate(string email, string pass);
        
        Task UpdateUser(UpdateUserRequest request, Guid UserId);
        
        Task<DeleteResponse> DeleteUser(DeleteRequest request);
        
        Task<IEnumerable<User>> GetAllUsers();        

        Task<User> GetUser(Guid request);

        Task AddUserSkill(UserSkill request);
        
        Task UpdateUserSkill(UserSkill request);

        Task DeleteUserSkill(Guid id);
        
        Task<UserSkill> GetUserSkill(Guid id);

        Task<IEnumerable<GetUserSkillResponse>> GetUserSkillsByUserId(Guid id);

        Task AddExternalWorkExperience(ExternalWorkExperience request);
        
        Task UpdateExternalWorkExperience(ExternalWorkExperience request);

        Task DeleteExternalWorkExperience(Guid id);
        
        Task<IEnumerable<ExternalWorkExperience>> GetExternalWorkExperiences(Guid userid);

        Task<Image> uploadProfileImage(Image request);

        Task<Image> GetImage(Guid ImageId);

        Task<Image> RemoveImage(Guid request);

        Task<Image> GetImageByUser(Guid UserId);

        Task<UserSkill> AddUserSkill(AddExistingSkillRequest request, Guid currentUser);

        Task<Skill> AddNewSkill(AddNewSkillRequest request);

        Task CreateUserSkillCollection(CreateSkillCollectionRequest request, Guid currentUser);
    }
}
