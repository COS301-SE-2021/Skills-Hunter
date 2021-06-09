using SkillsHunterAPI.Models;
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
        Task<Project> CreateProject(Project project);
        Task UpdateProject(Project project);
        Task DeleteProject(int id);
    }
}
