using System;
using System.Collections.Generic;
using MediatR;
using SkillsHunterAPI.Models.Project;

namespace SkillsHunterAPI.Queries.Project
{
    public class GetInvitationsByProjectIdQuery: IRequest<List<Invitation>>
    {
        public Guid ProjectId { get; }

        public GetInvitationsByProjectIdQuery(Guid id)
        {
            ProjectId = id;
        }
    }
}
