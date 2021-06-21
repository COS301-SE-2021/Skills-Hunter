using System;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SkillsHunterAPI.Services
{
    public interface IUserService
    {
        Task<User> AddUser(User request);
        
        Task<User> LogIn(string email, string pass);
        
        //Task<LogOutResponse> LogOut(LogOutRequest request);
        
        Task<UpdateResponse> UpdateUser(UpdateRequest request);
        
        Task<DeleteResponse> DeleteUser(DeleteRequest request);
        
        Task<IEnumerable<User>> GetAllUsers();
        
        Task<User> GetUser(Guid request);

        // Crud operations on the User Skill Model
        Task AddUserSkill(UserSkill request);
        
        Task UpdateUserSkill(Guid userSkillId, UserSkill request);

        Task DeleteUserSkill(Guid id);
        
        Task<UserSkill> GetUserSkill(Guid id);

        // Crud operations on the Work Experience Model

        Task AddWorkExperience(WorkExperience request);
        
        Task UpdateWorkExperience(Guid workExperienceID, WorkExperience request);

        Task DeleteWorkExperience(Guid id);
        
        Task<WorkExperience> GetWorkExperience(Guid id);
    }
}
