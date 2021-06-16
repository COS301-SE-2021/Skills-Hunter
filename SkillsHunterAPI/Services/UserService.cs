using System;
using System.Threading.Tasks;
using SkillsHunterAPI.Controllers.Responses;
using SkillsHunterAPI.Controllers.Requests;
using SkillsHunterAPI.Models.User;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace SkillsHunterAPI.Services
{
    public class UserService: IUserService
    {
        private SignInManager<User> _signManager; 
        private UserManager<User> _userManager; 
        public UserService(UserManager<User> userManager, SignInManager<User> signManager)
        {
            _signManager = signManager;
            _userManager = userManager;
        }

        public async Task<RegisterResponse> register(RegisterRequest request){
            var user = new User {   FirstName = request.FirstName,
                                    LastName = request.LastName,
                                    Email = request.Email,
                                    PhoneNumber = request.PhoneNumber,
                                    StartDate = request.StartDate,
                                    OpenForWork = request.OpenForWork,
                                    UserType = request.UserType,
                                }; 

            var result = await _userManager.CreateAsync(user, request.Password);
            RegisterResponse response = new RegisterResponse();
            if (result.Succeeded) { 
                response.Success = true;
            } else { 
                List<string> Errors = new List<string>();
                foreach (var Error in result.Errors) { 
                    Errors.Add(Error.Description); 
                }
                response.Success = false;
                response.Errors = Errors.ToArray(); 
            }  

            return response;
        }
    }
}
