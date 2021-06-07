using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    //[EnableCors()]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getProjects")]
        public async Task<IEnumerable<Project>> GetProjects()
        {
            return await _projectRepository.GetProjects();
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/getProject/{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            return await _projectRepository.GetProject(id);
        }

        [HttpPost]
        [Route("api/[controller]/createProject")]
        public async Task<ActionResult<Project>> CreateProject([FromBody] Project project)
        {
            Console.WriteLine("**********Debugginh******");
            var newProject = await _projectRepository.CreateProject(project);
            return CreatedAtAction(nameof(GetProjects), new { id = newProject.ProjectId }, newProject);
        }

        [HttpPut]
        [Route("api/[controller]/updateProject/{id}")]
        public async Task<ActionResult> UpdateProject(int id, [FromBody] Project project)
        {
            if (id != project.ProjectId)
            {
                return BadRequest();
            }

            await _projectRepository.UpdateProject(project);

            return NoContent();
        }

        [HttpDelete]
        [Route("api/[controller]/deleteProject/{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            var projectToDelete = await _projectRepository.GetProject(id);

            if (projectToDelete == null)
            {
                return NotFound();
            }

            await _projectRepository.DeleteProject(projectToDelete.ProjectId);
            return NoContent();
        }


    }

}
