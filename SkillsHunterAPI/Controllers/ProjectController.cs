﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Models.Notification;
using MediatR;
using SkillsHunterAPI.Queries;
using SkillsHunterAPI.Queries.Project;
using SkillsHunterAPI.Commands.Project;

namespace SkillsHunterAPI.Controllers
{
    [Authorize]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ISkillService _skillService;
        private UserController _userController;
        private NotificationController _notificationController;

        private readonly IMediator _mediator;

        public ProjectController(IProjectService projectService, ISkillService skillService, UserController userController,NotificationController notificationController, IMediator mediator)
        {
            _projectService = projectService;
            _skillService = skillService;
            _userController = userController;
            _notificationController = notificationController;
            //InitControllers();

            _mediator = mediator;
        }



        //This initialize the user controller object to be accessible this side.
        private void InitControllers()
        {
            // We can't set this at Ctor because we don't have our local copy yet
            // Access to Url 
            _userController.Url = Url;


            //This gives Access to User
            _userController.ControllerContext = ControllerContext;

        }




        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getProjects")]
        public async Task<IEnumerable<ProjectResponse>> GetProjects()
        {
            var query = new GetAllProjectsQuery();
            var result = await _mediator.Send(query);
            return result;
        }




        [HttpGet]
        [Route("api/[controller]/getProject")]
        public async Task<ProjectResponse> GetProject([FromQuery] Guid projectId)
        {
            var query = new GetProjectByProjectIdQuery(projectId);
            var result = await _mediator.Send(query);
            return result;
        }


        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getProjectsByOwnerId")]
        public async Task<IEnumerable<ProjectResponse>> GetProjectsByOwnerId()
        {
            InitControllers();
            var LoggedInOwner = _userController.GetCurrentUserId();
            var query = new GetProjectsByOwnerIdQuery(LoggedInOwner);
            var result = await _mediator.Send(query);
            return result;

        }


        [HttpPost]
        [Route("api/[controller]/createProject")]
        public async Task<ActionResult<ProjectResponse>> CreateProject([FromBody] CreateProjectCommand projectRequest)
        {
            ProjectResponse projectResponse = new ProjectResponse();

            InitControllers();
            projectRequest.Owner = _userController.GetCurrentUserId();
            var result = await _mediator.Send(projectRequest);
            return Ok(result);

            //return CreatedAtAction(nameof(GetProject), new { id = newProject.ProjectId }, newProject);
        }

        [HttpPut]
        [Route("api/[controller]/updateProject")]
        public async Task<ActionResult> UpdateProject([FromBody] UpdateProjectRequest projectRequest)
        {

            //Get the project id from the request
            Guid projectId = projectRequest.ProjectId;

            //Get project from the database to check if it is there
            Project project = await _projectService.GetProject(projectId);

            if (project == null )
            {
                return BadRequest();
            }

            
            ProjectResponse projectResponse = new ProjectResponse();

            Project ProjectToUpdate = new Project();
            ProjectToUpdate.Description = projectRequest.Description;
            ProjectToUpdate.Location = projectRequest.Location;
            ProjectToUpdate.OpenForApplication = projectRequest.OpenForApplication;
            ProjectToUpdate.Owner = projectRequest.Owner;
            ProjectToUpdate.Name = projectRequest.Name;
            ProjectToUpdate.DateCreated = DateTime.Now;
            Guid PID = projectRequest.ProjectId;

            
            await _projectService.UpdateProject(PID, ProjectToUpdate);


            List<GetProjectSkillResponse> projectSkillsFromDB = await _projectService.GetProjectSkillsByProjectId(PID);


            
            //Guid _projectID = projectRequest.ProjectId;
            foreach (AddExistingSkillRequest skillFromRequest in projectRequest.ExistingSkills)
            {
                ProjectSkill projectSkill = await _projectService.GetProjectSkill( projectId);

                if(projectSkill == null)
                {
                    ProjectSkill newProjectSkill = new ProjectSkill();
                    newProjectSkill.ProjectId = projectId;
                    newProjectSkill.SkillId = projectSkill.SkillId;
                    await _projectService.AddProjectSkill(newProjectSkill);
                }

            }

            foreach (GetProjectSkillResponse projectSkill in projectSkillsFromDB)
            {
                AddExistingSkillRequest projectSkillRevised = new AddExistingSkillRequest();
                projectSkillRevised.SkillId = projectSkill.SkillId;
                projectSkillRevised.Weight =projectSkill.Weight ;

                if(!projectRequest.ExistingSkills.Contains(projectSkillRevised))
                {
                    await _projectService.RemoveProjectSkill(projectSkill.SkillId);
                }

            }
            
            List<ProjectSkillCollection> projectSkillsCollectionFromDB = (List<ProjectSkillCollection>)await _projectService.GetCollectionsByProject(PID);


            //Adding skills from collections
            foreach (CreateSkillCollectionRequest collection in projectRequest.SkillCollections)
            {
                await _projectService.CreateCollection(collection, projectId);
            }

            return NoContent();
        }


        [HttpPost]
        [Route("api/[controller]/deleteProject")]
        public async Task<ActionResult> DeleteProject([FromQuery]Guid projectId)
        {
            var command = new DeleteProjectCommand(projectId);
            var result = await _mediator.Send(command);

            if(result == true)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("api/[controller]/addProjectSkill")]
        public async Task<ActionResult> AddProjectSkill([FromBody] ProjectSkill projectSkill)
        {
            await _projectService.AddProjectSkill(projectSkill);
            return NoContent();
        }

        [HttpPost]
        [Route("api/[controller]/deleteProjectSkill/{id}")]
        public async Task<ActionResult> RemoveProjectSkill(Guid id)
        {
            var projectSkill = await _projectService.GetProjectSkill(id);

            if (projectSkill == null)
            {
                return NotFound();
            }
            else
            {
                await _projectService.RemoveProjectSkill(id);
            }
            return NoContent();
        }

        [HttpPost]
        [Route("api/[controller]/applyForProject")]
        public async Task<ActionResult> ApplyForProject([FromQuery] Guid projectId)
        {
            InitControllers();

            Guid user = _userController.GetCurrentUserId();
            var command = new ApplyForProjectCommand(user, projectId);
            var result = await _mediator.Send(command);

            if(result == true)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/[controller]/inviteCandidate")]
        public async Task<ActionResult> InviteCandidate([FromBody] InviteCandidateCommand request)
        {
            InitControllers();
            //request.UserId = _userController.GetCurrentUserId();
            var result = _mediator.Send(request);

            if (result.Result == true)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/[controller]/createCollection")]
        public IActionResult CreateCollection(CreateCollectionRequest request){
            //This method handles the request to create a collection in the database
            try
            {
                // Create Collection code here


                return Ok(new CreateCollectionResponse(){

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


        [HttpGet]
        [Route("api/[controller]/getCollection")]
        public IActionResult GetCollection(GetCollectionRequest request){
            //This method handles the request to retrieve a skill collection
            try
            {
                // get Collection code here


                return Ok(new GetCollectionResponse(){

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


        [HttpPost]
        [Route("api/[controller]/updateCollection")]
        public IActionResult UpdateCollection(UpdateCollectionRequest request){
            //This method handles a request to update a Skill Collection
            try
            {
                // update Collection code here


                return Ok(new UpdateCollectionResponse(){

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


        [HttpPost]
        [Route("api/[controller]/removeCollection")]
        public IActionResult RemoveCollection(RemoveCollectionRequest request){
            //This method handles the request to remove a collection from the database
            try
            {
                // remove Collection code here


                return Ok(new RemoveCollectionResponse(){

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


        [HttpPost]
        [Route("api/[controller]/addSkillToCollection")]
        public IActionResult AddSkillToCollection(AddSkillToCollectionRequest request){
            //This method handles the request to add a Skill to a Skill Collection
            try
            {
                // Add skill to collection code here


                return Ok(new AddSkillToCollectionResponse(){

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

       
        [HttpGet]
        [Route("api/[controller]/getCollectionsByProject")]
        public IActionResult GetCollectionsByProject(GetCollectionsByProjectRequest request){
            //This method handles a request to retrieve Skill Collections by Project Id
            try
            {
                // Get collections by Project code here


                return Ok(new GetCollectionsByProjectResponse(){

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

        [HttpGet]
        [Route("api/[controller]/GetProjectSkillsByProjectId/{id}")]
        public async Task<GetProjectSkillsResponse> GetProjectSkillsByProjectId(Guid projectId)
        {
            GetProjectSkillsResponse response = new GetProjectSkillsResponse();

            response.Skills = (List<GetProjectSkillResponse>)await _projectService.GetProjectSkillsByProjectId(projectId);
            response.SkillCollections = (List<GetProjectSkillCollectionResponse>)await _projectService.GetProjectSkillCollectionsByProjectId(projectId);

            return response;
        }

        [HttpGet]
        [Route("api/[controller]/MatchCandidates")]
        public async Task<IEnumerable<MatchCandidateResponse>> MatchCandidates([FromQuery]Guid projectId)
        {

            var query = new MatchCandidatesQuery(projectId);
            var result = await _mediator.Send(query);
            return result;
        }

        [HttpGet]
        [Route("api/[controller]/getApplicationsByProjectId")]
        public async Task<IEnumerable<GetApplicationsResponse>> getApplicationsByProjectId([FromQuery] Guid projectId)
        {
            var query = new GetApplicationsByProjectIdQuery(projectId);
            var result = await _mediator.Send(query);
            return result;
        }


        [HttpGet]
        [Route("api/[controller]/getInvitationsByProjectId")]
        public async Task<IEnumerable<Invitation>> GetInvitationsByProjectId([FromQuery] Guid projectId)
        {
            var query = new GetInvitationsByProjectIdQuery(projectId);
            var result = await _mediator.Send(query);
            return result;

        }

    }
}
