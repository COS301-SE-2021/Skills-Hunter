using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
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
        public async Task<ActionResult<Project>> CreateProject([FromBody] Project project)
        {
            var newProject = await _projectService.CreateProject(project);
            //return CreatedAtAction(nameof(GetProjects), new { id = newProject.ProjectId }, newProject);
            return newProject;
        }

        [HttpPut]
        [Route("api/[controller]/updateProject/{id}")]
        public async Task<ActionResult> UpdateProject(int id, [FromBody] Project project)
        {
            if (id != project.ProjectId)
            {
                return BadRequest();
            }

            await _projectService.UpdateProject(project);

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
