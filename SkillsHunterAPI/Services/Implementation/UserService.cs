using System;
using System.IO;
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
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Models.Skill.Entity;
using SkillsHunterAPI.Models.User.Entity;
using SkillsHunterAPI.Models.User.Response;

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

        public async Task UpdateUser(UpdateUserRequest request, Guid UserId)
        {
            User user = _context.Users.Where(u => u.UserId== UserId).FirstOrDefault();

            if (user != null)
            {
                user.Name = request.Name;
                user.Surname = request.Surname;
                user.Email = request.Email;
                user.Phone = request.PhoneNumber;
                user.OpenForWork = request.OpenForWork;
                user.LinkedIn = request.LinkedIn;
                user.Github = request.Github;

                await _context.SaveChangesAsync();


            }



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
            UserSkill userSkill = await _context.UserSkills.Where(us => us.UserId == request.UserId && us.SkillId == request.SkillId).FirstOrDefaultAsync();

            if(userSkill == null)
            {
                request.UserSkillId = new Guid();

                _context.UserSkills.Add(request);
               await  _context.SaveChangesAsync();
            }
        }
        
        public async Task UpdateUserSkill(UserSkill request)
        {

            UserSkill userSkillFromDb = await _context.UserSkills.Where(us => us.UserId == request.UserId && us.SkillId == request.SkillId).FirstOrDefaultAsync();

            //Update the user skill if it is not found
            if(userSkillFromDb != null)
            {
                userSkillFromDb.Weight = request.Weight;
                await _context.SaveChangesAsync();
            }
            else //Add a new one if it does not exist
            {
                UserSkill newUserSkill = new UserSkill();
                newUserSkill.UserId = request.UserId;
                newUserSkill.SkillId = request.SkillId;
                newUserSkill.Weight = request.Weight;

                await AddUserSkill(newUserSkill);
            }
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

        public async Task AddExternalWorkExperience(ExternalWorkExperience request)
        {

            request.ExternalWorkExperienceId = new Guid();
            
            _context.ExternalWorkExperiences.Add(request);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateExternalWorkExperience(ExternalWorkExperience request)
        {

            ExternalWorkExperience result = await _context.ExternalWorkExperiences.Where( w=> w.ExternalWorkExperienceId == request.ExternalWorkExperienceId).FirstOrDefaultAsync();

            if(result == null)
            {
                await AddExternalWorkExperience(request);
            }
            else
            {
                result.Description = request.Description;
                result.EndDate = request.EndDate;
                request.Role = request.Role;
                result.StartDate = request.StartDate;
                _context.ExternalWorkExperiences.Update(result);

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteExternalWorkExperience(Guid id){
            var result = await _context.ExternalWorkExperiences.FindAsync(id);

            _context.ExternalWorkExperiences.Remove(result);
            await _context.SaveChangesAsync();
        }
        
        public async Task<IEnumerable<ExternalWorkExperience>> GetExternalWorkExperiences(Guid userid)
        {
            return await _context.ExternalWorkExperiences.Where(w => w.UserId == userid).ToListAsync();
        }

        public async Task<Image> uploadProfileImage(Image request){
            request.ImageId = Guid.NewGuid();
            Image result = request;
            Image existingImage = await _context.Images.SingleOrDefaultAsync(img => img.UserId == request.UserId);
            
            if(existingImage == null)
                _context.Images.Add(request);
            else{
                var oldFile = Path.Combine(Directory.GetCurrentDirectory(), existingImage.Path);
                File.Delete(oldFile);
                
                existingImage.Path = request.Path;
                result = existingImage;
            }
            
            await _context.SaveChangesAsync();

            return result;    
        }

        public async Task<Image> GetImage(Guid ImageId){
            return await _context.Images.FindAsync(ImageId);
        }


        public async Task<Image> RemoveImage(Guid ImageId){
            var result = await _context.Images.FindAsync(ImageId);

            _context.Images.Remove(result);
            await _context.SaveChangesAsync();

            return result;            
        }

        public async Task<Image> GetImageByUser(Guid UserId){
            return await _context.Images.SingleOrDefaultAsync(img => img.UserId == UserId);
        }

        public async Task<UserSkill> AddUserSkill(AddExistingSkillRequest request, Guid currentUser)
        {



            UserSkill userSkillRequest = new UserSkill();
            userSkillRequest.SkillId = request.SkillId;
            userSkillRequest.Weight = request.Weight;
            userSkillRequest.SkillId = currentUser;
            _context.UserSkills.Add(userSkillRequest);
            await _context.SaveChangesAsync();
            return userSkillRequest;
       
        }

        public async Task<Skill> AddNewSkill(AddNewSkillRequest request)
        {

            //Creating the new skill
            Skill newSkill = new Skill();
            newSkill.SkillId = new Guid();
            newSkill.Name = request.Name;
            newSkill.Status = SkillStatus.Pending;

            _context.Skills.Add(newSkill);

            await _context.SaveChangesAsync();

            //Linking the skill with the categories

            foreach(GetCategoryByIdRequest category in request.Categories)
            {
                SkillCategory skillCategory = new SkillCategory();
                skillCategory.SkillCategoryId = new Guid();
                skillCategory.CategoryId = category.CategoryId;
                skillCategory.SkillId = newSkill.SkillId;
                _context.SkillCategories.Add(skillCategory);
                await _context.SaveChangesAsync();
            }

            return newSkill;
        }

        public async Task CreateUserSkillCollection(CreateSkillCollectionRequest request, Guid currentUser)
        {
            User user = _context.Users.Where(u => u.UserId == currentUser).FirstOrDefault();

            if (user != null)
            {
                SkillCollection skillCollection = new SkillCollection();

                skillCollection.SkillCollectionId = new Guid();
                skillCollection.Name = request.Name;
                skillCollection.Description = request.Description;

                _context.SkillCollections.Add(skillCollection);
                await _context.SaveChangesAsync();


                foreach(AddExistingSkillRequest skill in request.Skills)
                {
                    SkillCollectionMap skillCollectionMap = new SkillCollectionMap();
                    
                    skillCollectionMap.SkillCollectionMapId = new Guid();
                    skillCollectionMap.SkillCollectionId = skillCollection.SkillCollectionId;
                    skillCollectionMap.SkillId = skill.SkillId;

                    _context.SkillCollectionMaps.Add(skillCollectionMap);
                    await _context.SaveChangesAsync();

                }


                UserSkillCollection userSkillCollection = new UserSkillCollection();

                userSkillCollection.UserSkillCollectionId = new Guid();

                userSkillCollection.SkillCollectionId = skillCollection.SkillCollectionId;
                userSkillCollection.UserId = currentUser;
                userSkillCollection.Weight = request.Weight;

                _context.UserSkillCollections.Add(userSkillCollection);
                await _context.SaveChangesAsync();

            }

            
        }


        public async Task<IEnumerable<GetUserSkillResponse>> GetUserSkillsByUserId(Guid id)
        {
            List<GetUserSkillResponse> response = new List<GetUserSkillResponse>();
            List<UserSkill> userSkills = await _context.UserSkills.Where(u => u.UserId == id).ToListAsync();

            foreach(UserSkill userSkill in userSkills)
            {
                //Checking if the skill exists
                Skill skill = await _context.Skills.Where(s => s.SkillId == userSkill.SkillId).FirstOrDefaultAsync();

                if(skill != null)
                {
                    GetUserSkillResponse skillResponse = new GetUserSkillResponse();
                    skillResponse.skillId = skill.SkillId;
                    skillResponse.Name = skill.Name;
                    skillResponse.Weight = userSkill.Weight;

                    response.Add(skillResponse);
                }
            }

            return response;
        }

    }
}
