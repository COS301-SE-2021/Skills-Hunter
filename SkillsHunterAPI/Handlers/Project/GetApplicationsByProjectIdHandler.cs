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
    public class GetApplicationsByProjectIdHandler: ProjectHandler, IRequestHandler<GetApplicationsByProjectIdQuery, List<GetApplicationsResponse>>
    {
        public GetApplicationsByProjectIdHandler(IProjectService projectService) : base(projectService)
        {
        }

        async Task<List<GetApplicationsResponse>> IRequestHandler<GetApplicationsByProjectIdQuery, List<GetApplicationsResponse>>.Handle(GetApplicationsByProjectIdQuery request, CancellationToken cancellationToken)
        {
            return await _projectService.GetApplicationsByProjectId(request.ProjectId);
        }
    }
}
