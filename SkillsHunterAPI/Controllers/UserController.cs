using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.User;

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
        
        public async Task<ActionResult> register(registerRequest projectRequest)
        {
            /*if (id != projectRequest.ProjectId)
            {
                return BadRequest();
            }*/

            //await _projectService.UpdateProject(projectRequest);

            return NoContent();
        }
    }
}
