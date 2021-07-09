using System;
using System.Globalization;
using System.Text.RegularExpressions;
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
            if(!IsValidEmail(user.Email))
                throw new Exception("Email is invalid");
                
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (_context.Users.Any(x => x.Email == user.Email))
                throw new Exception("Email address '" + user.Email + "' is already taken");

            if (_context.Users.Any(x => x.Phone == user.Phone))
                throw new Exception("Phone number '" + user.Phone + "' is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        private static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    string domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException e)
            {
                return false;
            }
            catch (ArgumentException e)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
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

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Email == email);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
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

            result.SkillId = request.SkillId;
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

        public async Task<Image> CreateImage(Image request){
            Image result = null;


            return result;    
        }

        public async Task<Image> GetImage(Guid ImageId){
            Image result = null;

            return result;
        }

        public async Task<Image> UpdateImage(Guid request){
            Image result = null;

            return result;
        }

        public async Task RemoveImage(Guid request){


        }

        public async Task<Image> GetImageByUser(Guid UserId){
            Image result = null;

            return result;
        }
    }
}
