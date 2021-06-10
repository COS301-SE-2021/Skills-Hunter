using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getProjects")]
        public async Task<IEnumerable<Project>> GetProjects()
        {
            return await _projectService.GetProjects();
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/getProject/{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            return await _projectService.GetProject(id);
        }

        [HttpPost]
        [Route("api/[controller]/createProject")]
        public async Task<ActionResult<ProjectResponse>> CreateProject([FromBody] ProjectRequest projectRequest)
        {
            var newProject = await _projectService.CreateProject(projectRequest);
            //return CreatedAtAction(nameof(GetProjects), new { id = newProject.ProjectId }, newProject);
            //return newProject;
            return new ProjectResponse();
        }

        [HttpPut]
        [Route("api/[controller]/updateProject/{id}")]
        public async Task<ActionResult> UpdateProject(int id, [FromBody] ProjectRequest projectRequest)
        {
            if (id != projectRequest.ProjectId)
            {
                return BadRequest();
            }

            await _projectService.UpdateProject(projectRequest);

            return NoContent();
        }

        [HttpDelete]
        [Route("api/[controller]/deleteProject/{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            var projectToDelete = await _projectService.GetProject(id);

            if (projectToDelete == null)
            {
                return NotFound();
            }

            await _projectService.DeleteProject(projectToDelete.ProjectId);
            return NoContent();
        }


    }

}
