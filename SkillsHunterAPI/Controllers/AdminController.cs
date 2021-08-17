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
            Skill skill = new Skill(request.Name,request.CategoryId);
            
            AddSkillResponse response = new AddSkillResponse(); 
            response.Success = true;
            response.Added = await _adminService.AddSkill(skill);
            
            return response; 
        }

        [HttpPost]
        [Route("api/[controller]/addCategory")]
        public async Task<AddCategoryResponse> AddCategory([FromBody] AddCategoryRequest request)
        {
            Category category = new Category(request.Name,request.Description);
            
            AddCategoryResponse response = new AddCategoryResponse(); 
            response.Success = true;
            response.Added = await _adminService.AddCategory(category);
            
            return response; 
        }

        [HttpDelete]
        [Route("api/[controller]/removeSkill/{id}")]
        public async Task<RemoveSkillResponse> RemoveSkill(Guid id)
        {
            RemoveSkillResponse response = new RemoveSkillResponse();
            
            response.Success = true;
            response.Removed = await _adminService.RemoveSkill(id);

            return response;
        }

        [HttpDelete]
        [Route("api/[controller]/removeProject/{id}")]
        public async Task<RemoveProjectResponse> RemoveProject(Guid id){
            return new RemoveProjectResponse();
        }

    }
}
