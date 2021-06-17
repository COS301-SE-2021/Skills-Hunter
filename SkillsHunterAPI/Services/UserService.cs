﻿using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.User;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using SkillsHunterAPI.Data;

namespace SkillsHunterAPI.Services
{
    public class UserService: IUserService
    {
        private readonly SignInManager<User> _signManager; 
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        public UserService(UserManager<User> userManager, SignInManager<User> signManager,ApplicationDbContext context)
        {
            _signManager = signManager;
            _userManager = userManager;
            _context = context;
        }

        public async Task<IdentityResult> Register(User request)
        {
            var result = await _userManager.CreateAsync(request, request.Password);
            return result;
        }

        public async Task<LogInResponse> LogIn(LogInRequest request)
        {
            return new LogInResponse();
        }

        public async Task<LogOutResponse> LogOut(LogOutRequest request)
        {
            return new LogOutResponse();
        }

        public async Task<UpdateResponse> UpdateUser(UpdateRequest request)
        {
            return new UpdateResponse();
        }

        public async Task<DeleteResponse> DeleteUser(DeleteRequest request)
        {
            return new DeleteResponse();
        }

        public async Task<GetAllResponse> GetAllUsers(GetAllRequest request)
        {
            var result =  await _context.Users.ToListAsync();
            GetAllResponse response = new GetAllResponse(); 
            
            response.Accounts = result.ToArray();
            response.Success = true;

            return response;
        }

        public async Task<GetResponse> GetUser(GetUserRequest request)
        {
            var result = await _context.Users.FindAsync(request.UserId);
            GetResponse response = new GetResponse();

            response.Account = result;
            response.Success = true;

            return response;
        }
        // Crud operations on the User Skill Model
        public async Task AddUserSkill(UserSkill request)
        {

            request.UserSkillId = new Guid();
            
            _context.UserSkills.Add(request);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateUserSkill(Guid userSkillId, UserSkill request)
        {

            UserSkill result = await _context.UserSkills.FindAsync(userSkillId);

            result.SkillID = request.SkillID;
            result.Weight = request.Weight;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserSkill(Guid id)
        {

            var result = await _context.UserSkills.FindAsync(id);

            _context.UserSkills.Remove(result);
            await _context.SaveChangesAsync();
        }
        
        public async Task<UserSkill> GetUserSkill(Guid id)
        {
            return await _context.UserSkills.FindAsync(id);
        }

        // Crud operations on the Work Experience Model

        public async Task AddWorkExperience(WorkExperience request)
        {

            request.WorkExperienceId = new Guid();
            
            _context.WorkExperiences.Add(request);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateWorkExperience(Guid workExperienceID, WorkExperience request)
        {

            WorkExperience result = await _context.WorkExperiences.FindAsync(request.WorkExperienceId);

            result.ProjectId = request.ProjectId;
            result.startDate = request.startDate;
            result.endDate = request.endDate;
            result.performanceRating = request.performanceRating;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteWorkExperience(Guid id){
            var result = await _context.WorkExperiences.FindAsync(id);

            _context.WorkExperiences.Remove(result);
            await _context.SaveChangesAsync();
        }
        
        public async Task<WorkExperience> GetWorkExperience(Guid id){
            return await _context.WorkExperiences.FindAsync(id);
        }
    }
}
