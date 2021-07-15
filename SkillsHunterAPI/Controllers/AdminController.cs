using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace SkillsHunterAPI.Controllers
{
    [Authorize(Roles = "Admin")]
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
            Skill skill = new Skill(request.Name);
            
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


        [HttpPost]
        [Route("api/[controller]/removeSkill")]
        public async Task<RemoveSkillResponse> RemoveSkill([FromBody]RemoveSkillRequest removeSkillRequest)

        {
            RemoveSkillResponse response = new RemoveSkillResponse();
            
            response.Success = true;
            response.Removed = await _adminService.RemoveSkill(removeSkillRequest.SkillId);

            return response;
        }


        /*[HttpPost]
        [Route("api/[controller]/removeProject")]
        public async Task<RemoveProjectResponse> RemoveProject([FromBody]Guid id){
            return new RemoveProjectResponse();
        }*/

        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getSkills")]
        public async Task<GetSkillsResponse> GetSkills()
        {

                GetSkillsResponse skills = new GetSkillsResponse();
                skills.skills = (await _adminService.GetSkills()).ToArray();
                return skills;
        }

        [HttpPost]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/getCollections")]
        public IActionResult GetCollections(GetCollectionsRequest request){
            try
            {
                // Get collections code here


                return Ok(new GetCollectionsResponse(){

                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here
                
                return BadRequest(new 
                       { 
                            message = error.Message 
                       });
            }
        }

    }
}
