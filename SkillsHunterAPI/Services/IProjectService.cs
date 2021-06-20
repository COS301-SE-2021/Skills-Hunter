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
        Task<IEnumerable<Project>> GetProjects();
        Task<Project> GetProject(Guid id);
        Task<Project> CreateProject(Project project);
        Task UpdateProject(Guid id, Project project);
        Task DeleteProject(Guid id);

        //Project Skills
        Task AddProjectSkill(ProjectSkill projectSkill);
        Task RemoveProjectSkill(Guid projectSkillId);
        Task<ProjectSkill> GetProjectSkill(Guid ProjectID);
        Task<ProjectSkill> GetProjectSkillBySkillId(Guid SkillId, Guid ProjectId);
        Task<IEnumerable<ProjectSkill>> GetProjectSkills(Guid projectId);
        Task<bool> ApplyForProject(Guid userId,Guid projectId);
        Task<bool> InviteCandidate(Guid userId,Guid projectId, Guid inviteeId, String message);
    }
}
