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
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request
        public async Task<IEnumerable<Project>> GetProjects()
        {
            return await _projectRepository.GetProjects();
        }

        [HttpGet("{id}")]//This tells ASP.Net that the method will handle http get request with an argument
        //ActionResult provide the flexibility to return all the types like not found, bad request , e.t.c
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            return await _projectRepository.GetProject(id);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody] Project project)
        {
            var newProject = await _projectRepository.CreateProject(project);
            return CreatedAtAction(nameof(GetProjects), new { id = newProject.Id }, newProject);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProject(int id, [FromBody] Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            await _projectRepository.UpdateProject(project);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            return null;
        }


    }

}
