using System;
using MediatR;
using SkillsHunterAPI.Models.Project.Response;

namespace SkillsHunterAPI.Queries.Project
{
    public class GetProjectByProjectIdQuery : IRequest<ProjectResponse>
    {
        public Guid ProjectId { get; }

        public GetProjectByProjectIdQuery(Guid id)
        {
            ProjectId = id;
        }
    }
}
