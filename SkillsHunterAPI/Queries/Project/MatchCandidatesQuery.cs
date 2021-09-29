using System;
using System.Collections.Generic;
using MediatR;
using SkillsHunterAPI.Models.Project.Response;

namespace SkillsHunterAPI.Queries.Project
{
    public class MatchCandidatesQuery: IRequest<List<MatchCandidateResponse>>
    {
        public Guid projectId { get; }

        public MatchCandidatesQuery(Guid proj)
        {
            projectId = proj;
        }
    }
}
