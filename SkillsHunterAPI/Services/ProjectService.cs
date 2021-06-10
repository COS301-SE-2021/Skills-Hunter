using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Data;
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
    public class ProjectService : IProjectService
    {

        private readonly ApplicationDbContext _context;

        /// <summary>
        /// We inject the context through the constructor
        /// </summary>
        /// <param name="context"></param>
        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        //Project

        public async Task<Project> CreateProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }

        public async Task DeleteProject(Guid id)
        {
            var ProjectToDelete = await _context.Projects.FindAsync(id);
            _context.Projects.Remove(ProjectToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<Project> GetProject(Guid id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task UpdateProject(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        //Project Skills

        public async Task AddProjectSkill(ProjectSkill projectSkill)
        {
            _context.ProjectSkills.Add(projectSkill);
            await _context.SaveChangesAsync();

        }

        public async Task RemoveProjectSkill(Guid projectSkillId)
        {
            var projectSkill = await _context.ProjectSkills.FindAsync(projectSkillId);
            _context.ProjectSkills.Remove(projectSkill);
            await _context.SaveChangesAsync();
        }

        public async Task<ProjectSkill> GetProjectSkill(Guid id)
        {
            return await _context.ProjectSkills.FindAsync(id);
        }

        public async Task<IEnumerable<ProjectSkill>> GetProjectSkills(Guid projectId)
        {
            return await _context.ProjectSkills.Where(ss => ss.ProjectSkillId == projectId).ToArrayAsync();
        }
    }
}
