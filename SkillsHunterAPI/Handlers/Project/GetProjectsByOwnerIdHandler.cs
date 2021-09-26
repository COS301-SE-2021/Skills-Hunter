using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Queries.Project;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPI.Handlers.Project
{
    public class GetProjectsByOwnerIdHandler: ProjectHandler, IRequestHandler<GetProjectsByOwnerIdQuery, List<ProjectResponse>>
    {
        public GetProjectsByOwnerIdHandler(IProjectService projectService): base(projectService)
        {
        }

        async Task<List<ProjectResponse>> IRequestHandler<GetProjectsByOwnerIdQuery, List<ProjectResponse>>.Handle(GetProjectsByOwnerIdQuery request, CancellationToken cancellationToken)
        {
            List<ProjectResponse> projectResponses = new List<ProjectResponse>();

            List<Models.Project.Project> projects = await _projectService.GetProjectsByOwnerId(request.OwnerId);

            if (projects != null)
            {
                foreach (Models.Project.Project P in projects)
                {

                    var project = await _projectService.GetProject(P.ProjectId);

                    ProjectResponse projectResponse = new ProjectResponse();
                    //projectResponse.ProjectSkills = new List<SkillRR>();

                    if (project != null)
                    {
                        projectResponse.ProjectId = project.ProjectId;
                        projectResponse.Owner = project.Owner;
                        projectResponse.Name = project.Name;
                        projectResponse.Description = project.Description;
                        projectResponse.DateCreated = project.DateCreated;
                        projectResponse.OpenForApplication = project.OpenForApplication;

                        projectResponse.ProjectSkills.Skills = await _projectService.GetProjectSkillsByProjectId(P.ProjectId);// GetProjectSkillsByProjectId(project.ProjectId);
                        projectResponse.ProjectSkills.SkillCollections = await _projectService.GetProjectSkillCollectionsByProjectId(P.ProjectId);

                        projectResponses.Add(projectResponse);
                    }
                }
            }

            return projectResponses;
        }
    }
}
