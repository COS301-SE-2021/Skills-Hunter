using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services
{
    public interface IProjectService
    {
        //Project
        Task<IEnumerable<ProjectResponse>> GetProjects();
        Task<Project> GetProject(string id);
        Task<ProjectResponse> CreateProject(ProjectRequest project);
        Task UpdateProject(ProjectRequest project);
        Task DeleteProject(string id);

        //Project Skills
        Task AddProjectSkill(ProjectSkill projectSkill);
        Task RemoveProjectSkill(string projectSkillId);
        Task<ProjectSkill> GetProjectSkill(string id);
    }
}
