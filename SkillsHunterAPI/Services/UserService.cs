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

        public async Task<registerResponse> register(registerRequest request){
            var user = new User {   firstName = request.firstName,
                                    lastName = request.lastName,
                                    email = request.email,
                                    phoneNumber = request.phoneNumber,
                                    startDate = request.startDate,
                                    openForWork = request.openForWork,
                                    userType = request.userType,
                                }; 

            var result = await _userManager.CreateAsync(user, request.password);
            registerResponse response = new registerResponse();
            if (result.Succeeded) { 
                response.success = true;
            } else { 
                List<string> errors = new List<string>();
                foreach (var error in result.Errors) { 
                    errors.Add(error.Description); 
                }
                response.success = false;
                response.errors = errors.ToArray(); 
            }  

            return response;
        }
    }
}
