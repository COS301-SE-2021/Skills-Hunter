using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsHunterAPI.Commands.Project;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPI.Handlers.Project
{
    public class DeleteProjectHandler: ProjectHandler, IRequestHandler<DeleteProjectCommand, bool>
    {
        public DeleteProjectHandler(IProjectService service): base(service)
        {

        }

        async Task<bool> IRequestHandler<DeleteProjectCommand, bool>.Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
        {
            //This calls the service to delete the project from the db
            bool deletedStatus = await _projectService.DeleteProject(request.ProjectId);

            if(deletedStatus == true)
            {
                //Deleting project skills
                List<GetProjectSkillResponse> projectSkills = await _projectService.GetProjectSkillsByProjectId(request.ProjectId);
                foreach (GetProjectSkillResponse projectSkill in projectSkills)
                {
                    await _projectService.RemoveProjectSkill(projectSkill.ProjectSkillId);
                }
            }


            /*This calls the service to delete project skill from the db*/
            
            return deletedStatus;
        }
    }
}
