using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Queries.Project;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPI.Handlers.Project
{
    public class GetInvitationsByProjectIdHandler: ProjectHandler, IRequestHandler<GetInvitationsByProjectIdQuery, List<Invitation>>
    {
        public GetInvitationsByProjectIdHandler(IProjectService projectService) : base(projectService)
        {
        }

        async Task<List<Invitation>> IRequestHandler<GetInvitationsByProjectIdQuery, List<Invitation>>.Handle(GetInvitationsByProjectIdQuery request, CancellationToken cancellationToken)
        {
            return (List<Invitation>)await _projectService.GetInvitationsByProjectId(request.ProjectId);
        }
    }
}
