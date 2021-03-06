using Microsoft.AspNetCore.Http;
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

namespace SkillsHunterAPI.Controllers
{
    [Authorize]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ISkillService _skillService;
        private UserController _userController;

        public ProjectController(IProjectService projectService, ISkillService skillService, UserController userController)
        {
            _projectService = projectService;
            _skillService = skillService;
            _userController = userController;
            //InitControllers();
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
            List<ProjectResponse> projectResponses = new List<ProjectResponse>();

            List<Project> projects = (List<Project>)await _projectService.GetProjects();

            foreach (Project project in projects)
            {
                ProjectResponse retrievedProject = await GetProject(project.ProjectId.ToString());

                if (retrievedProject != null)
                {
                    projectResponses.Add(retrievedProject);
                }
                
            }

            return projectResponses;
        }




        [HttpGet]
        [Route("api/[controller]/getProject/{id}")]
        public async Task<ProjectResponse> GetProject(string id)
        {
            Guid projectId = new Guid(id);
            Project project = await _projectService.GetProject(projectId);

            ProjectResponse projectResponse = new ProjectResponse();
            //projectResponse.ProjectSkills = new List<SkillRR>();

            if (project == null) {
                return null;
            }

            projectResponse.ProjectId = project.ProjectId;
            projectResponse.Owner = project.Owner;
            projectResponse.Name = project.Name;
            projectResponse.Description = project.Description;
            projectResponse.DateCreated = project.DateCreated;
            projectResponse.OpenForApplication = project.OpenForApplication;

            projectResponse.ProjectSkills = await GetProjectSkillsByProjectId(project.ProjectId);

            /*List<ProjectSkill> projectSkills = (List<ProjectSkill>)await _projectService.GetProjectSkillsByProjectId(projectId);

            foreach (ProjectSkill projectSkill in projectSkills)
            {
                SkillRR skill = new SkillRR();


                    skill.SkillId = projectSkill.SkillId;
                //Skill refSkill = await _skillService.GetSkill(projectSkill.SkillId);  //To be used when the skill service is implemented
                skill.SkillName = "SkillOne";
               
                projectResponse.ProjectSkills.Add(skill);
            }*/

            /* foreach (ProjectSkill projectSkill in projectSkills)
             {
                 projectResponse.ProjectSkills.Add(projectSkill);
             }*/


            return projectResponse;
        }


        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getProjectsByOwnerId")]
        public async Task<IEnumerable<ProjectResponse>> GetProjectsByOwnerId()
        {
            List<ProjectResponse> projectResponses = new List<ProjectResponse>();

            List<Project> projects = (List<Project>)await _projectService.GetProjects();


        
            //This initialize the user controller object to be accessible this side.
            InitControllers();


            //This gets identity of the user currently authenticated.
            var LoggedInOwner = _userController.GetCurrentUserId();




            foreach (Project project in projects)
            {
                ProjectResponse retrievedProject = await GetProject(project.ProjectId.ToString());

                if (retrievedProject != null && retrievedProject.Owner == LoggedInOwner)
                {
                    projectResponses.Add(retrievedProject);
                }

            }

            return projectResponses;
        }


        [HttpPost]
        [Route("api/[controller]/createProject")]
        public async Task<ActionResult<ProjectResponse>> CreateProject([FromBody] CreateProjectRequest projectRequest)
        {
            ProjectResponse projectResponse = new ProjectResponse();

            InitControllers();
            Project newProject = new Project();
            newProject.Description = projectRequest.Description;
            newProject.Location = projectRequest.Location;
            newProject.OpenForApplication = projectRequest.OpenForApplication;
            newProject.Owner = _userController.GetCurrentUserId();
            newProject.Name = projectRequest.Name;
            newProject.DateCreated = DateTime.Now;

            //Adding the project to the database;
            newProject = await _projectService.CreateProject(newProject);


            //Adding skills from the list of existing skills
            foreach (AddExistingSkillRequest skill in projectRequest.ExistingSkills)
            {
                ProjectSkill projectSkill = new ProjectSkill();
                projectSkill.ProjectId = newProject.ProjectId;
                projectSkill.SkillId = skill.SkillId;
                projectSkill.Weight = skill.Weight;
                await _projectService.AddProjectSkill(projectSkill);
            }

            //Adding new skills
            foreach (AddNewSkillRequest skill in projectRequest.NewSkills)
            {
                AddSkillRequest skillToAdd = new AddSkillRequest();
                skillToAdd.Categories = skill.Categories;
                skillToAdd.Name = skill.Name;
                Skill newSkill = await _projectService.AddNewSkill(skillToAdd);

                //Checking if the new skill was created before linking it with the project
                if (newSkill != null)
                {
                    ProjectSkill projectSkill = new ProjectSkill();
                    projectSkill.ProjectId = newProject.ProjectId;
                    projectSkill.SkillId = newSkill.SkillId;
                    projectSkill.Weight = skill.Weight;
                    await _projectService.AddProjectSkill(projectSkill);
                }

            }

            //Adding skills from collections
            foreach (CreateSkillCollectionRequest collection in projectRequest.SkillCollections)
            {
                await _projectService.CreateCollection(collection, newProject.ProjectId);
            }

            List<GetProjectSkillResponse> projectSkills = (List<GetProjectSkillResponse>)await _projectService.GetProjectSkillsByProjectId(newProject.ProjectId);


            //projectResponse.ProjectSkills = (ProjectSkill[])await _projectService.GetProjectSkills(newProject.ProjectId);

            //var newProject = await _projectService.CreateProject(projectRequest);
            return CreatedAtAction(nameof(GetProject), new { id = newProject.ProjectId }, newProject);
            //return newProject;
            //return projectResponse;
        }

        [HttpPut]
        [Route("api/[controller]/updateProject")]
        public async Task<ActionResult> UpdateProject([FromBody] UpdateProjectRequest projectRequest)
        {


            /*Guid projectId = new Guid(projectRequest.ProjectId);
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
            Guid PID = new Guid(projectRequest.ProjectId);


            await _projectService.UpdateProject(PID, ProjectToUpdate);


            List<ProjectSkill> projectSkillsFromDB = (List<ProjectSkill>)await _projectService.GetProjectSkills(ProjectToUpdate.ProjectId);*/


            /*Guid _projectID = new Guid(projectRequest.ProjectId);
            foreach (SkillRR skillFromRequest in projectRequest.ProjectSkills)
            {
                ProjectSkill projectSkill = await _projectService.GetProjectSkillBySkillId(skillFromRequest.SkillId, _projectID);

                if(projectSkill == null)
                {
                    ProjectSkill newProjectSkill = new ProjectSkill();
                    newProjectSkill.ProjectId = _projectID;
                    newProjectSkill.SkillId = projectSkill.SkillId;
                    await _projectService.AddProjectSkill(newProjectSkill);
                }

            }


            foreach (ProjectSkill projectSkill in projectSkillsFromDB)
            {
                SkillRR projectSkillRevised = new SkillRR();
                projectSkillRevised.SkillId = projectSkill.SkillId;
                projectSkillRevised.SkillName = "SkillOne";

                if(!projectRequest.ProjectSkills.Contains(projectSkillRevised))
                {
                    await _projectService.RemoveProjectSkill(projectSkill.SkillId);
                }

            }*/




            return NoContent();
        }


        [HttpPost]
        [Route("api/[controller]/deleteProject")]
        public async Task<ActionResult> DeleteProject([FromBody]DeleteProjectRequest deleteProjectRequest)
        {
            Guid projectId = deleteProjectRequest.ProjectId;
            var projectToDelete = await _projectService.GetProject(projectId);
            List<GetProjectSkillResponse> projectSkills = (List<GetProjectSkillResponse>)await _projectService.GetProjectSkillsByProjectId(projectId);



            /*This checks if the project exists, if not then it returns not found */

            if (projectToDelete == null)
            {
                return NotFound();
            }


            //This calls the service to delete the project from the db
            await _projectService.DeleteProject(projectToDelete.ProjectId);


            /*This calls the service to delete project skill from the db*/
            foreach(GetProjectSkillResponse projectSkill in projectSkills)
            {
                await _projectService.RemoveProjectSkill(projectSkill.ProjectSkillId);
            }
            return NoContent();
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


        [HttpPost]
        [Route("api/[controller]/applyForProject")]
        public async Task<ApplyForProjectResponse> ApplyForProject([FromBody] ApplyForProjectRequest request)
        {
            ApplyForProjectResponse applyForProjectResponse = new ApplyForProjectResponse();

             var reqStatus = _projectService.ApplyForProject(request.UserId, request.ProjectId);

            if (reqStatus)
            {
                applyForProjectResponse.Success = true;
            }
            else
            {
                applyForProjectResponse.Success = false;
            }
            return applyForProjectResponse;
        }


        [HttpPost]
        [Route("api/[controller]/inviteCandidate")]
        public InviteCandidateResponse InviteCandidate([FromBody] InviteCandidateRequest request)
        {
            //This create an Invite candidate response object
            InviteCandidateResponse inviteCandidateResponse = new InviteCandidateResponse();


            var InviteStatus = _projectService.InviteCandidate(request.UserId, request.ProjectId, request.InviteeId, request.Message);

            if (InviteStatus)
            {
                inviteCandidateResponse.Success = true;
            }
            else
            {
                inviteCandidateResponse.Success = false;
            }


            return inviteCandidateResponse;
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

    }
}
