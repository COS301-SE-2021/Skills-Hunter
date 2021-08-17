using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using SkillsHunterAPI.Models.Skill.Response;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Models.Skill.Entity;
using SkillsHunterAPI.Models.Project.Request;

namespace SkillsHunterAPI.Controllers
{
    //[Authorize(Roles = "Admin")]
    [Authorize]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }


        [HttpGet]
        [Route("api/[controller]/getSkill")]
        public async Task<IActionResult> GetSkill([FromBody] GetSkillRequest request)
        {
            try
            {
                // Get skill code here
                Guid id = new Guid(request.Id);

                Skill result = await _adminService.GetSkill(id);

                return Ok(new GetSkillResponse()
                {
                    Id = result.SkillId,
                    Name = result.Name,
                    Status = result.Status
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return NotFound(error.Message);
            }
        }

        [HttpPost]
        [Route("api/[controller]/createSkill")]
        public async Task<IActionResult> CreateSkill([FromBody] AddSkillRequest request)
        {
            try
            {
                // Add skill code here
                Skill skill = new Skill();
                skill.Name = request.Name;
                skill.Status = SkillStatus.Accepted;

                Skill result = await _adminService.CreateSkill(skill);

                //Link skill with Categories
                await _adminService.AddCategoriesToSkill(skill.SkillId, request.Categories);

                return Ok(new AddSkillResponse()
                {
                    Added = result
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return BadRequest(error.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/[controller]/addCategory")]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryRequest request)
        {

            try
            {
                // Add category code here
                Category category = new Category();

                category.Name = request.Name;

                category.Description = request.Description;

                Category result = await _adminService.AddCategory(category);

                return Ok(new AddCategoryResponse()
                {
                    Added = result
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return BadRequest(error.Message);
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/[controller]/removeSkill")]
        public async Task<IActionResult> RemoveSkill([FromBody] RemoveSkillRequest request)
        {
            try
            {
                // Remove category code here

                //Guid id = new Guid(request.SkillId);
                Skill result = await _adminService.RemoveSkill(request.SkillId);

                return Ok(new RemoveSkillResponse()
                {
                    Success = true,
                    Removed = result
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return NotFound(error.Message);
            }
        }


        /*[HttpPost]
        [Route("api/[controller]/removeProject")]
        public async Task<RemoveProjectResponse> RemoveProject([FromBody]Guid id){
            return new RemoveProjectResponse();
        }*/

        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getSkills")]
        public async Task<IActionResult> GetSkills()
        {
            try
            {
                // Get categories code here
                List<Skill> result = (List<Skill>)await _adminService.GetSkills();

                return Ok(new GetSkillsResponse()
                {
                    skills = result.ToArray()
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return StatusCode(500, $"Internal server error: {error}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/updateSkill")]
        public async Task<IActionResult> UpdateSkill([FromBody] UpdateSkillRequest request)
        {
            try
            {
                // Update skill code here
                Guid id = new Guid(request.Id);
                Skill skill = new Skill();

                skill.Name = request.Name;

                //skill.CategoryId = new Guid(request.CategoryId);

                skill.Status = request.Status;

                Skill result = await _adminService.UpdateSkill(id, skill);

                return Ok(new UpdateSkillResponse()
                {
                    Id = result.SkillId,
                    Name = result.Name,
                    Status = result.Status
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return NotFound(error.Message);
            }
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/getCategory")]
        public async Task<IActionResult> GetCategory([FromBody] GetCategoryRequest request)
        {
            try
            {
                // Get category code here
                Guid id = new Guid(request.Id);

                Category result = await _adminService.GetCategory(id);

                return Ok(new GetCategoryResponse()
                {
                    Id = result.CategoryId,
                    Name = result.Name,
                    Description = result.Description
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return NotFound(error.Message);
            }
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/getCategories")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                // Get categories code here
                List<Category> result = (List<Category>)await _adminService.GetCategories();

                return Ok(new GetCategoriesResponse()
                {
                    category = result.ToArray()
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return StatusCode(500, $"Internal server error: {error}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/updateCategory")]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryRequest request)
        {
            try
            {
                // Update category code here
                Guid id = new Guid(request.Id);
                Category category = new Category();

                category.Name = request.Name;

                category.Description = request.Description;

                Category result = await _adminService.UpdateCategory(id, category);

                return Ok(new UpdateCategoryResponse()
                {
                    Id = result.CategoryId,
                    Name = result.Name,
                    Description = result.Description
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return NotFound(error.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/removeCategory")]
        public async Task<IActionResult> RemoveCategory(RemoveCategoryRequest request)
        {
            try
            {
                // Remove category code here

                Guid id = new Guid(request.Id);
                Category result = await _adminService.RemoveCategory(id);

                return Ok(new RemoveCategoryResponse()
                {
                    Id = result.CategoryId,
                    Name = result.Name,
                    Description = result.Description
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return NotFound(error.Message);
            }
        }

        [HttpPost]
        [Route("api/[controller]/createSkillCollection")]
        public async Task<IActionResult> CreateSkillCollection([FromBody] CreateSkillCollectionRequest request)
        {
            return Ok();
        }

        [HttpGet]
        [Route("api/[controller]/getAllSkillCollections")]
        public async Task<IActionResult> GetAllSkillCollections()
        {
            try
            {
                // Get collections code here
                List<GetSkillCollectionResponse> result = (List<GetSkillCollectionResponse>)await _adminService.getAllSkillCollections();

                return Ok(result);
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here

                return BadRequest(error.Message);
            }
        }
    }
}
