using System;
using MediatR;

namespace SkillsHunterAPI.Commands.Project
{
    public class ApplyForProjectCommand: IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }

        public ApplyForProjectCommand(Guid user, Guid proj)
        {
            UserId = user;
            ProjectId = proj;
        }
    }
}
