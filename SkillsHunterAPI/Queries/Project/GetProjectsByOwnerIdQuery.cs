using System;
using System.Collections.Generic;
using MediatR;
using SkillsHunterAPI.Models.Project.Response;

namespace SkillsHunterAPI.Queries.Project
{
    public class GetProjectsByOwnerIdQuery : IRequest<List<ProjectResponse>>
    {
        public Guid OwnerId { get; }

        public GetProjectsByOwnerIdQuery(Guid ownerId)
        {
            OwnerId = ownerId;
        }
    }
}
