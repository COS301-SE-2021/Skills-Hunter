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
    public class MatchCandidatesHandler: ProjectHandler, IRequestHandler<MatchCandidatesQuery, List<MatchCandidateResponse>>
    {
        public MatchCandidatesHandler(IProjectService projectService) : base(projectService)
        {
        }

        async Task<List<MatchCandidateResponse>> IRequestHandler<MatchCandidatesQuery, List<MatchCandidateResponse>>.Handle(MatchCandidatesQuery request, CancellationToken cancellationToken)
        {
            return await _projectService.MatchCandidates(request.projectId);
        }
    }
}
