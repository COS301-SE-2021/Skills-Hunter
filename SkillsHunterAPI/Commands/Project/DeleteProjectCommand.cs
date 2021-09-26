using System;
using MediatR;

namespace SkillsHunterAPI.Commands.Project
{
    public class DeleteProjectCommand: IRequest<bool>
    {
        public DeleteProjectCommand()
        {
        }
    }
}
