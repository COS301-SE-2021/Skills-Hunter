using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.User;
using SkillsHunterAPI.Controllers.Requests;
using SkillsHunterAPI.Controllers.Responses;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost]
        [Route("api/[controller]/register")]
        
        public async Task<registerResponse> register(registerRequest projectRequest)
        {
            var result = await _userService.register(projectRequest);
            return result;
        }
    }
}
