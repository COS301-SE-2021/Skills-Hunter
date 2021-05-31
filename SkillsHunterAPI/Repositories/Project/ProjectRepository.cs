using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Repositories
{
    public class ProjectRepository : IProjectRepository
    {

        private readonly ApplicationContextDB _context;

        /// <summary>
        /// We inject the context through the constructor
        /// </summary>
        /// <param name="context"></param>
        public ProjectRepository(ApplicationContextDB context)
        {
            _context = context;
        }
        
        public async Task<Project> CreateProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }

        public async Task DeleteProject(int id)
        {
            var ProjectToDelete = await _context.Projects.FindAsync(id);
            _context.Projects.Remove(ProjectToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<Project> GetProject(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            return null;
        }

        public async Task UpdateProject(Project project)
        {
           
        }
    }
}
