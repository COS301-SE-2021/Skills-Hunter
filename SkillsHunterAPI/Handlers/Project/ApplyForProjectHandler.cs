using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsHunterAPI.Commands.Project;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPI.Handlers.Project
{
    public class ApplyForProjectHandler: ProjectHandler, IRequestHandler<ApplyForProjectCommand, bool>
    {
        public ApplyForProjectHandler(IProjectService projectService): base(projectService)
        {
        }

        async Task<bool> IRequestHandler<ApplyForProjectCommand, bool>.Handle(ApplyForProjectCommand request, CancellationToken cancellationToken)
        {
            bool res = await _projectService.ApplyForProject(request.UserId, request.ProjectId);

            return res;
        }
    }
}
