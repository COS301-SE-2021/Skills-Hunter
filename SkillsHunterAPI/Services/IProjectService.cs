using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Project.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetProjects();
        Task<Project> GetProject(int id);
        Task<Project> CreateProject(ProjectRequest project);
        Task UpdateProject(ProjectRequest project);
        Task DeleteProject(int id);
    }
}
