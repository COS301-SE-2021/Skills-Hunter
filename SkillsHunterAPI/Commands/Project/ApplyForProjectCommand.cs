using System;
using MediatR;

namespace SkillsHunterAPI.Commands.Project
{
    public class ApplyForProjectCommand: IRequest<ProjectResponse>
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }

        public ApplyForProjectCommand()
        {
        }
    }
}
