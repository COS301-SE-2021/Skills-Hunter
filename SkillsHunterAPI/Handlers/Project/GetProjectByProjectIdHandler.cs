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
    public class GetProjectByProjectIdHandler: ProjectHandler, IRequestHandler<GetProjectByProjectIdQuery, ProjectResponse>
    {
        public GetProjectByProjectIdHandler(IProjectService projectService):base(projectService)
        {
        }

        async Task<ProjectResponse> IRequestHandler<GetProjectByProjectIdQuery, ProjectResponse>.Handle(GetProjectByProjectIdQuery request, CancellationToken cancellationToken)
        {
            var project = await _projectService.GetProject(request.ProjectId);

            ProjectResponse projectResponse = new ProjectResponse();
            //projectResponse.ProjectSkills = new List<SkillRR>();

            if (project == null)
            {
                return null;
            }

            projectResponse.ProjectId = project.ProjectId;
            projectResponse.Owner = project.Owner;
            projectResponse.Name = project.Name;
            projectResponse.Description = project.Description;
            projectResponse.DateCreated = project.DateCreated;
            projectResponse.OpenForApplication = project.OpenForApplication;

            projectResponse.ProjectSkills.Skills = await  _projectService.GetProjectSkillsByProjectId(request.ProjectId);// GetProjectSkillsByProjectId(project.ProjectId);
            projectResponse.ProjectSkills.SkillCollections = await _projectService.GetProjectSkillCollectionsByProjectId(request.ProjectId);

            return projectResponse;
        }
    }
}
