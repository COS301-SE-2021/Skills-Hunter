using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.User;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Collections.Generic;
using SkillsHunterAPI.Data;
using System.Linq;

namespace SkillsHunterAPI.Services
{
    public class UserService: IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public User Create(User user,string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (_context.Users.Any(x => x.Email == user.Email))
                throw new Exception("Email \"" + user.Email + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<User> LogIn(string email, string pass)
        {
            User result = null;
            return result;
        }

        /*public async Task<LogOutResponse> LogOut(LogOutRequest request)
        {
            return new LogOutResponse();
        }*/

        public async Task<UpdateResponse> UpdateUser(UpdateRequest request)
        {
            return new UpdateResponse();
        }

        public async Task<DeleteResponse> DeleteUser(DeleteRequest request)
        {
            return new DeleteResponse();
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUser(Guid request)
        {
            return await _context.Users.FindAsync(request);
        }
        // Crud operations on the User Skill Model
        public async Task AddUserSkill(UserSkill request)
        {
            request.UserSkillId = new Guid();
            
            _context.UserSkills.Add(request);
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
