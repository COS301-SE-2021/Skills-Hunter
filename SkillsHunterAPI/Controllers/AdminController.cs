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
using SkillsHunterAPI.Queries;
using MediatR;

namespace SkillsHunterAPI.Controllers
{
    //[Authorize(Roles = "Admin")]
    [Authorize]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IMediator _mediator;

        public AdminController(IAdminService adminService, IMediator mediator)
        {
            _adminService = adminService;
            _mediator = mediator;
        }


        [HttpGet]
        [Route("api/[controller]/getSkill")]
        public async Task<IActionResult> GetSkill([FromBody] GetSkillRequest request)
        {

            Guid SkillId = new Guid(request.Id);

            var query = new GetSkillByIdQuery(SkillId);

            var result = await _mediator.Send(query);

            return result != null ? Ok(result) : NotFound();
            
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
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryCommand command)
        {

            var result = await _mediator.Send(command);

            return CreatedAtAction("GetCategory", new { result.Name }, result);
            

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
            var query = new GetSkillsQuery();

            var result =await _mediator.Send(query);

            return Ok(result);
            
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

            Guid categoryId = new Guid(request.Id);
            var query = new GetCategoryByIdQuery(categoryId);

            var result = await _mediator.Send(query);

            return result != null ? Ok(result) : NotFound();

        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/getCategories")]
        public async Task<IActionResult> GetCategories()
        {


            var query = new GetCategoriesQuery();

            var result = await _mediator.Send(query);

            return Ok(result);


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
        [HttpGet]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/removeCategory")]
        public async Task<IActionResult> RemoveCategory([FromQuery]Guid request)
        {
            try
            {
                // Remove category code here

                Category result = await _adminService.RemoveCategory(request);

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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/[controller]/createSkillCollection")]
        public async Task<IActionResult> CreateSkillCollection([FromBody] CreateSkillCollectionRequest request)
        {
            SkillCollection skillCollection = new SkillCollection();
            skillCollection.Name = request.Name;
            skillCollection.Description = request.Description;

            skillCollection = await _adminService.CreateSkillCollection(skillCollection);

            //Linking the Skills with the skillCollection
            foreach(AddExistingSkillRequest skill in request.Skills)
            {
                await _adminService.AddSkillToSkillCollection(skillCollection.SkillCollectionId, skill.SkillId);
            }

            return Ok();
        }

        [HttpGet]
        [Route("api/[controller]/getAllSkillCollections")]
        public async Task<IActionResult> GetAllSkillCollections()
        {

            var query = new GetAllSkillCollectionsQuery();

            var result = await _mediator.Send(query);

            return Ok(result);
            

        }
    }
}
