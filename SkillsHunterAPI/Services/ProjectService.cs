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
            project.ProjectId = new Guid();
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

        public async Task UpdateProject(Guid projectId, Project project)
        {
            //_context.Entry(project).State = EntityState.Modified;
            Project projectFromDb = await _context.Projects.FindAsync(projectId);

            projectFromDb.Name = project.Name;
            projectFromDb.OpenForApplication = project.OpenForApplication;
            projectFromDb.Owner = project.Owner;
            projectFromDb.Location = project.Location;
            projectFromDb.DateCreated = project.DateCreated;
            projectFromDb.Description = project.Description;
            await _context.SaveChangesAsync();
        }

        //Project Skills

        public async Task AddProjectSkill(ProjectSkill projectSkill)
        {
            projectSkill.ProjectSkillId = new Guid();
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
            return await _context.ProjectSkills.Where(ss => ss.ProjectId == projectId).ToListAsync();
        }

        public async Task<ProjectSkill> GetProjectSkillBySkillId(Guid SkillId, Guid ProjectId)
        {
            return await _context.ProjectSkills.Where(ss => ss.ProjectId == ProjectId && ss.SkillId == SkillId).FirstAsync();
        }

        public async Task<bool> ApplyForProject(Guid userId,Guid ProjectId){
            bool applicationSuccess = false;


            Application applicationFromDB = _context.Applications.Where(ss => ss.ApplicantId == userId && ss.ProjectId == ProjectId).FirstOrDefault();

            if (applicationFromDB != null)
            {
                return false;
            }

            Application newApplication = new Application();
            newApplication.ApplicationId = new Guid();
            newApplication.ProjectId = ProjectId;
            newApplication.ApplicantId = userId;

            _ = _context.Applications.AddAsync(newApplication);

            applicationFromDB = _context.Applications.Where(ss => ss.ApplicantId == userId && ss.ProjectId == ProjectId).FirstOrDefault();

            if (applicationFromDB != null)
            {
                return true;
            }

            return applicationSuccess;
        }

        public bool InviteCandidate(Guid userId, Guid ProjectId,Guid inviteeId, String message)
        {
            bool invitationSuccess = false;


            Invitation existingInvitations = _context.Invitations.Where(ss => ss.InviteeId == inviteeId && ss.ProjectId == ProjectId).FirstOrDefault();

            
            if(existingInvitations != null)
            {
                return false;
            }


            Invitation newInvitation = new Invitation();

            newInvitation.InviterId = userId;
            newInvitation.InviteeId = inviteeId;
            newInvitation.ProjectId = ProjectId;
            newInvitation.Message = message;
            newInvitation.InviteDate = new DateTime();

            _context.AddAsync(newInvitation);


            existingInvitations = _context.Invitations.Where(ss => ss.InviteeId == inviteeId && ss.ProjectId == ProjectId).FirstOrDefault();

            if (existingInvitations != null)
            {
                return true;
            }


            return invitationSuccess;
        }
    }
}
