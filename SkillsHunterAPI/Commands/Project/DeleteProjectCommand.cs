using System;
using MediatR;

namespace SkillsHunterAPI.Commands.Project
{
    public class DeleteProjectCommand : IRequest<bool>
    {
        public Guid ProjectId { get; }

        public DeleteProjectCommand(Guid proj)
        {
            ProjectId = proj;
        }
    }
}
