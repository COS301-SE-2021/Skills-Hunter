﻿using System;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SkillsHunterAPI.Services
{
    public interface IUserService
    {
        Task<IdentityResult> Register(User request);
        
        Task<LogInResponse> LogIn(LogInRequest request);
        
        Task<LogOutResponse> LogOut(LogOutRequest request);
        
        Task<UpdateResponse> UpdateUser(UpdateRequest request);
        
        Task<DeleteResponse> DeleteUser(DeleteRequest request);
        
        Task<GetAllResponse> GetAllUsers(GetAllRequest request);
        
        Task<GetResponse> GetUser(GetUserRequest request);

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
