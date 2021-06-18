using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.Skill;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    public class AdminController: ControllerBase
    {
        private readonly IAdminService _adminService;

        public UserController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost]
        [Route("api/[controller]/addSkill")]
        public async Task<AddSkillResponse> AddSkill([FromBody] AddSkillRequest request)
        {
            
        }

    }
}
