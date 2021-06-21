using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.User;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Collections.Generic;
using SkillsHunterAPI.Data;

namespace SkillsHunterAPI.Services
{
    public class UserService: IUserService
    {
        private readonly ApplicationDbContext _context;

        private string Hash(string Password){
            // generate a 128-bit salt using a secure PRNG
            // byte[] salt = new byte[128 / 8];
            
            // using (var rng = RandomNumberGenerator.Create())
            // {
            //     rng.GetBytes(salt);
            // }
    
            // // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            // string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            //     password: Password,
            //     salt: salt,
            //     prf: KeyDerivationPrf.HMACSHA1,
            //     iterationCount: 10000,
            //     numBytesRequested: 256 / 8));

            // return hashed;
            return Password;
        }

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddUser(User request)
        {
            request.UserId = Guid.NewGuid();

            request.Password = Hash(request.Password);            
            _context.Users.Add(request);
            await _context.SaveChangesAsync();

            return request;
        }

        public async Task<User> LogIn(string email, string pass)
        {
            var allUsers = await _context.Users.ToListAsync();
            User result = null;
            
            foreach (var user in allUsers)
            {

                if(user.Email == email && user.Password == Hash(pass)){
                    result = user;
                    break;
                }    
            }
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
