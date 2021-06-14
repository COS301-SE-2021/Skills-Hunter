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
        //private readonly ISkillService _skillService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
            //_skillService = skillService;
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getProjects")]
        public async Task<IEnumerable<ProjectResponse>> GetProjects()
        {
            List<ProjectResponse> projectResponses = new List<ProjectResponse>();

            List<Project> projects = (List<Project>)await _projectService.GetProjects();

            foreach (Project project in projects)
            {
                projectResponses.Add((ProjectResponse)await GetProject(project.ProjectId.ToString()));
            }

            return projectResponses;
        }

        [HttpGet]//This tells ASP.Net that the method will handle http get request with an argument
        [Route("api/[controller]/getProject/{id}")]
        public async Task<ProjectResponse> GetProject(string id)
        {
            Guid projectId = new Guid(id);
            Project project = await _projectService.GetProject(projectId);

            ProjectResponse projectResponse = new ProjectResponse();
            //projectResponse.ProjectSkills = new List<ProjectSkill>();

            if (project == null) {
                return null;
            }

            projectResponse.ProjectId = project.ProjectId;
            projectResponse.Owner = project.Owner;
            projectResponse.Name = project.Name;
            projectResponse.Description = project.Description;
            projectResponse.DateCreated = project.DateCreated;
            projectResponse.OpenForApplication = project.OpenForApplication;

            List<ProjectSkill> projectSkills = (List<ProjectSkill>)await _projectService.GetProjectSkills(projectId);

            foreach (ProjectSkill projectSkill in projectSkills)
            {
                SkillRR skill = new SkillRR();
                skill.SkillId = projectSkill.SkillId;
                //Skill refSkill = await _skillService.GetSkill(projectSkill.SkillId);
                skill.SkillName = "SkillOne";
                projectResponse.ProjectSkills.Add(skill);
            }

           /* foreach (ProjectSkill projectSkill in projectSkills)
            {
                projectResponse.ProjectSkills.Add(projectSkill);
            }*/


            return projectResponse;
        }

        [HttpPost]
        [Route("api/[controller]/createProject")]
        public async Task<ActionResult<ProjectResponse>> CreateProject([FromBody] ProjectRequest projectRequest)
        {
            ProjectResponse projectResponse = new ProjectResponse();

            Project newProject = new Project();
            newProject.Description = projectRequest.Description;
            newProject.Location = projectRequest.Location;
            newProject.OpenForApplication = projectRequest.OpenForApplication;
            newProject.Owner = projectRequest.Owner;
            newProject.Name = projectRequest.Name;
            newProject.DateCreated = DateTime.Now;

            //Adding the project to the database;
            newProject = await _projectService.CreateProject(newProject);

            //Adding the project skills to the database;

            /*foreach (ProjectSkill projectSkill in projectRequest.ProjectSkills)
            {
                projectSkill.SF = newProject.ProjectId;
                await _projectService.AddProjectSkill(projectSkill);
            }*/

            List<ProjectSkill> projectSkills = (List<ProjectSkill>)await _projectService.GetProjectSkills(newProject.ProjectId);

            foreach (SkillRR projectSkill in projectRequest.ProjectSkills)
            {
                ProjectSkill newProjectSkill = new ProjectSkill();
                newProjectSkill.ProjectId = newProject.ProjectId;
                newProjectSkill.SkillId = projectSkill.SkillId;
                //ProjectSkill RefprojectSkill = await _projectService.GetProjectSkillBySkillId(projectSkill.SkillId, newProject.ProjectId);
                await _projectService.AddProjectSkill(newProjectSkill);
            }


            //projectResponse.ProjectSkills = (ProjectSkill[])await _projectService.GetProjectSkills(newProject.ProjectId);

            //var newProject = await _projectService.CreateProject(projectRequest);
            return CreatedAtAction(nameof(GetProject), new { id = newProject.ProjectId }, newProject);
            //return newProject;
            //return projectResponse;
        }

        [HttpPut]
        [Route("api/[controller]/updateProject/{id}")]
        public async Task<ActionResult> UpdateProject(int id, [FromBody] ProjectRequest projectRequest)
        {
            /*if (id != projectRequest.ProjectId)
            {
                return BadRequest();
            }*/

            //await _projectService.UpdateProject(projectRequest);

            return NoContent();
        }

        [HttpDelete]
        [Route("api/[controller]/deleteProject/{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            Guid projectId = new Guid();
            var projectToDelete = await _projectService.GetProject(projectId);

            if (projectToDelete == null)
            {
                return NotFound();
            }

            await _projectService.DeleteProject(projectToDelete.ProjectId);
            return NoContent();
        }

        //Project Skills

        [HttpPost]
        [Route("api/[controller]/addProjectSkill")]
        public async Task<ActionResult> AddProjectSkill([FromBody] ProjectSkill projectSkill)
        {
            await _projectService.AddProjectSkill(projectSkill);
            return NoContent();
        }

        [HttpDelete]
        [Route("api/[controller]/deleteProjectSkill/{id}")]
        public async Task<ActionResult> RemoveProjectSkill(string id)
        {
            //var projectSkill = await _projectService.GetProjectSkill(id);

            //if (projectSkill == null)
            //{
            //    return NotFound();
            //}
            //else
            //{
            //    await _projectService.RemoveProjectSkill(id);
            //}
            return NoContent();
        }

    }

}
