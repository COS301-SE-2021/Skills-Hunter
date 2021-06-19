using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    public class AdminController: ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost]
        [Route("api/[controller]/addSkill")]
        public async Task<AddSkillResponse> AddSkill([FromBody] AddSkillRequest request)
        {
            return new AddSkillResponse();
        }

        [HttpPost]
        [Route("api/[controller]/addCategory")]
        public async Task<AddCategoryResponse> AddCategory([FromBody] AddCategoryRequest request)
        {
            return new AddCategoryResponse();
        }

        [HttpDelete]
        [Route("api/[controller]/removeSkill/{id}")]
        public async Task<RemoveSkillResponse> RemoveSkill(Guid id)
        {
            return new RemoveSkillResponse();
        }

        [HttpDelete]
        [Route("api/[controller]/removeProject/{id}")]
        public async Task<RemoveProjectResponse> RemoveProject(Guid id){
            return new RemoveProjectResponse();
        }

    }
}
