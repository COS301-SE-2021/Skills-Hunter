using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Data;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill.Request;

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

        public async Task<IEnumerable<Project>> GetProjectsByOwnerId()
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

        public bool ApplyForProject(Guid userId,Guid ProjectId)
        {
            bool applicationSuccess = false;


            Application applicationFromDB = _context.Applications.Where(ss => ss.ApplicantId == userId && ss.ProjectId == ProjectId).FirstOrDefault();
            User userFromDB = _context.Users.Where(ss => ss.UserId == userId).FirstOrDefault();
            Project projectFromDB = _context.Projects.Where(ss => ss.ProjectId == ProjectId).FirstOrDefault();
            if (applicationFromDB != null || userFromDB == null || projectFromDB == null)

            {
                return false;
            }

            Application newApplication = new Application();
            newApplication.ApplicationId = new Guid();
            newApplication.ProjectId = ProjectId;
            newApplication.ApplicantId = userId;

            _context.Applications.Add(newApplication);
            _context.SaveChangesAsync();

            //Application application = _context.Applications.Where(ss => ss.ApplicantId == userId && ss.ProjectId == ProjectId).FirstOrDefault();

            /*if (application != null)
            {
                return true;
            }*/

            return true ;
        }

        public  bool InviteCandidate(Guid userId, Guid ProjectId,Guid inviteeId, String message)
        {
            bool invitationSuccess = false;


            Invitation existingInvitations = _context.Invitations.Where(ss => ss.InviteeId == inviteeId && ss.ProjectId == ProjectId).FirstOrDefault();
            User ownerFromDB = _context.Users.Where(ss => ss.UserId == userId).FirstOrDefault();
            User inviteeFromDB = _context.Users.Where(ss => ss.UserId == inviteeId).FirstOrDefault();
            Project projectFromDB = _context.Projects.Where(ss => ss.ProjectId == ProjectId).FirstOrDefault();


            if (existingInvitations != null || ownerFromDB == null || inviteeFromDB == null || projectFromDB == null || projectFromDB.Owner != userId)
            {
                return false;
            }


            Invitation newInvitation = new Invitation();

            newInvitation.InviterId = userId;
            newInvitation.InviteeId = inviteeId;
            newInvitation.ProjectId = ProjectId;
            newInvitation.Message = message;
            newInvitation.InviteDate = DateTime.Now;
            newInvitation.InvitationId = new Guid();

            _context.Add(newInvitation);
            _context.SaveChangesAsync();


            //Invitation invitation = _context.Invitations.Where(ss => ss.InviteeId == inviteeId && ss.ProjectId == ProjectId).FirstOrDefault();

            /*if (invitation != null)
            {
                return true;
            }*/


            return true;
        }

        public async Task<ProjectSkillCollection> CreateCollection(AddSkillCollectionRequest request, Guid projectId)
        {
            //Creating the new SkillCollection object
            ProjectSkillCollection skillCollection = new ProjectSkillCollection();
            skillCollection.ProjectSkillCollectionId = new Guid();
            skillCollection.Name = request.Name;
            skillCollection.Description = request.Description;
            skillCollection.ProjectId = projectId;
            skillCollection.Weight = request.Weight;

            //Saving the SkillCollection object on the database
            _context.ProjectSkillCollections.Add(skillCollection);
            await _context.SaveChangesAsync();

            //Linking the skills with the skillCollection
            foreach (AddExistingSkillRequest skillToAdd in request.Skills)
            {
                ProjectSkillCollectionMap skillCollectionMap = new ProjectSkillCollectionMap();
                skillCollectionMap.ProjectSkillCollectionMapId = new Guid();
                skillCollectionMap.ProjectSkillCollectionId = skillCollection.ProjectSkillCollectionId;
                skillCollectionMap.SkillId = skillToAdd.SkillId;

                _context.ProjectSkillCollectionMaps.Add(skillCollectionMap);
                await _context.SaveChangesAsync();

                //Adding the skills to projecSkills
                ProjectSkill projectSkill = new ProjectSkill();
                projectSkill.SkillId = skillToAdd.SkillId;
                projectSkill.ProjectId = projectId;
                projectSkill.Weight = request.Weight;

                await AddProjectSkill(projectSkill);
            }

            return skillCollection;
        }

        public async Task<ProjectSkillCollection> GetCollection(Guid collectionId)
        {
            ProjectSkillCollection result = null;


            return result;
        }
        
        public async Task<ProjectSkillCollection> UpdateCollection(ProjectSkillCollection request)
        {
            ProjectSkillCollection result = null;


            return result;
        }

        public async Task RemoveCollection(Guid collectionId)
        {            
        }

        public async Task<ProjectSkillCollectionMap> AddSkillToCollection(Guid skillId,Guid collectionId)
        {
            ProjectSkillCollectionMap result = null;

            return result;
        }

        public async Task<List<ProjectSkillCollection>> GetCollectionsByProject(Guid projectId)
        {
            List<ProjectSkillCollection> result = new List<ProjectSkillCollection>();
        
            return result;
        }
    }
}
