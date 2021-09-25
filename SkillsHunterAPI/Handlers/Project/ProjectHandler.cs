using System;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPI.Handlers.Project
{
    public class ProjectHandler
    {
        protected readonly IProjectService _projectService;

        protected ProjectHandler(IProjectService projectService)
        {
            _projectService = projectService;
        }
    }
}
