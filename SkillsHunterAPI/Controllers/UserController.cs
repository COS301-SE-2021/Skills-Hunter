using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(UserManager<User> userManager, SignInManager<User> signManager)
        {
            _userService = new UserService(userManager,signManager);
        }


        [HttpPost]
        [Route("api/[controller]/register")]
        
        public async Task<RegisterResponse> register(RegisterRequest request)
        {
            var response = await _userService.register(request);
            return response;
        }
    }
}
