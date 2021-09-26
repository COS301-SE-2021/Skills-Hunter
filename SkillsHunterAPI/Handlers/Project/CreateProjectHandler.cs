using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsHunterAPI.Commands.Project;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPI.Handlers.Project
{
    public class CreateProjectHandler: ProjectHandler, IRequestHandler<CreateProjectCommand, ProjectResponse>
    {
        public CreateProjectHandler(IProjectService projectService):base(projectService)
        {
        }

        async Task<ProjectResponse> IRequestHandler<CreateProjectCommand, ProjectResponse>.Handle(CreateProjectCommand projectRequest, CancellationToken cancellationToken)
        {
            Models.Project.Project newProject = new Models.Project.Project();
            newProject.Description = projectRequest.Description;
            newProject.Location = projectRequest.Location;
            newProject.OpenForApplication = projectRequest.OpenForApplication;
            newProject.Name = projectRequest.Name;
            newProject.DateCreated = DateTime.Now;
            newProject.Owner = projectRequest.Owner;

            //Adding the project to the database;
            newProject = await _projectService.CreateProject(newProject);


            //Adding skills from the list of existing skills
            if(projectRequest.ExistingSkills != null && projectRequest.ExistingSkills.Count > 0)
            {
                foreach (AddExistingSkillRequest skill in projectRequest.ExistingSkills)
                {
                    ProjectSkill projectSkill = new ProjectSkill();
                    projectSkill.ProjectId = newProject.ProjectId;
                    projectSkill.SkillId = skill.SkillId;
                    projectSkill.Weight = skill.Weight;
                    await _projectService.AddProjectSkill(projectSkill);
                }
            }


            //Adding new skills
            if(projectRequest.NewSkills != null && projectRequest.NewSkills.Count >0)
            {
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
            }
            

            //Adding skills from collections
            if(projectRequest.SkillCollections != null && projectRequest.SkillCollections.Count > 0)
            {
                foreach (CreateSkillCollectionRequest collection in projectRequest.SkillCollections)
                {
                    await _projectService.CreateCollection(collection, newProject.ProjectId);
                }
            }
            
            //Returning the created project
            ProjectResponse projectResponse = new ProjectResponse();
            //projectResponse.ProjectSkills = new List<SkillRR>();

            projectResponse.ProjectId = newProject.ProjectId;
            projectResponse.Owner = newProject.Owner;
            projectResponse.Name = newProject.Name;
            projectResponse.Description = newProject.Description;
            projectResponse.DateCreated = newProject.DateCreated;
            projectResponse.OpenForApplication = newProject.OpenForApplication;

            projectResponse.ProjectSkills.Skills = await _projectService.GetProjectSkillsByProjectId(newProject.ProjectId);
            projectResponse.ProjectSkills.SkillCollections = await _projectService.GetProjectSkillCollectionsByProjectId(newProject.ProjectId);

            return projectResponse;
        }
    }
}
