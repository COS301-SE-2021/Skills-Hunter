using System;
using System.Collections.Generic;
using MediatR;
using SkillsHunterAPI.Models.Project.Response;

namespace SkillsHunterAPI.Queries.Project
{
    public class GetApplicationsByProjectIdQuery: IRequest<List<GetApplicationsResponse>>
    {
        public Guid ProjectId { get; }

        public GetApplicationsByProjectIdQuery(Guid id)
        {
            ProjectId = id;
        }
    }
}
