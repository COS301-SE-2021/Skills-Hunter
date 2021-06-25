﻿using System;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SkillsHunterAPI.Services
{
    public interface IUserService
    {
        User Create(User request,string password);
        
        User Authenticate(string email, string pass);
        
        //Task<LogOutResponse> LogOut(LogOutRequest request);
        
        Task<UpdateResponse> UpdateUser(UpdateRequest request);
        
        Task<DeleteResponse> DeleteUser(DeleteRequest request);
        
        Task<IEnumerable<User>> GetAllUsers();
        
        User GetUser(Guid request);

        Task AddUserSkill(UserSkill request);
        
        Task UpdateUserSkill(Guid userSkillId, UserSkill request);

        Task DeleteUserSkill(Guid id);
        
        Task<UserSkill> GetUserSkill(Guid id);

        Task AddWorkExperience(WorkExperience request);
        
        Task UpdateWorkExperience(Guid workExperienceID, WorkExperience request);

        Task DeleteWorkExperience(Guid id);
        
        Task<WorkExperience> GetWorkExperience(Guid id);
    }
}
