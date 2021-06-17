using System;
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
        private SignInManager<User> _signManager; 
        private UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        public UserService(UserManager<User> userManager, SignInManager<User> signManager,ApplicationDbContext context)
        {
            _signManager = signManager;
            _userManager = userManager;
            _context = context;
        }

        public async Task<RegisterResponse> Register(RegisterRequest request)
        {
            var user = new User {   FirstName = request.FirstName,
                                    LastName = request.LastName,
                                    Email = request.Email,
                                    UserType = request.UserType
                                }; 

            var result = await _userManager.CreateAsync(user, request.Password);
            RegisterResponse response = new RegisterResponse();

            if (result.Succeeded)
            { 
                response.Success = true;
            }
            else
            { 
                List<string> Errors = new List<string>();
                foreach (var Error in result.Errors)
                { 
                    Errors.Add(Error.Description); 
                }
                response.Success = false;
                response.Errors = Errors.ToArray(); 
            }  

            return response;
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
    }
}
