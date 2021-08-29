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
using SkillsHunterAPI.Models.Skill.Entity;

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
            Skill skill = await _context.Skills.Where(s => s.SkillId == projectSkill.SkillId).FirstOrDefaultAsync();

            if(skill == null)
            {
                return;
            }

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

        public async Task<IEnumerable<GetProjectSkillResponse>> GetProjectSkillsByProjectId(Guid projectId)
        {
            List<GetProjectSkillResponse> response = new List<GetProjectSkillResponse>();
            List<ProjectSkill> projectSkills = await _context.ProjectSkills.Where(ss => ss.ProjectId == projectId).ToListAsync();

            foreach(ProjectSkill projectSkill in projectSkills)
            {
                GetProjectSkillResponse projectSkillToAdd = await GetProjectSkill(projectSkill.ProjectSkillId, projectId);

                if(projectSkillToAdd != null)
                {
                    response.Add(projectSkillToAdd);
                }
            }

            return response;
        }

        public async Task<GetProjectSkillResponse> GetProjectSkill(Guid projectSkillId, Guid projectId)
        {
            GetProjectSkillResponse response = new GetProjectSkillResponse();
            ProjectSkill projectSkill = await _context.ProjectSkills.Where(ss => ss.ProjectId == projectId && ss.ProjectSkillId == projectSkillId).FirstOrDefaultAsync();

            if(projectSkill != null)
            {
                Skill skill = await _context.Skills.Where(ss => ss.SkillId == projectSkill.SkillId).FirstOrDefaultAsync();
                if(skill != null)
                {
                    response.ProjectSkillId = projectSkill.ProjectSkillId;
                    response.SkillId = skill.SkillId;
                    response.Name = skill.Name;
                    response.Weight = projectSkill.Weight;

                    return response;
                }
            }

            return null;
        }
        public async Task<IEnumerable<GetProjectSkillCollectionResponse>> GetProjectSkillCollectionsByProjectId(Guid projectId)
        {

            List<GetProjectSkillCollectionResponse> response = new List<GetProjectSkillCollectionResponse>();
            //Retrieving the project skills
            List<ProjectSkillCollection> projectSkillCollections = await _context.ProjectSkillCollections.Where(psc => psc.ProjectId == projectId).ToListAsync();

            //Retrieving the skills mappings
            foreach(ProjectSkillCollection projectSkillCollection in projectSkillCollections)
            {
                List<SkillCollectionMap> skillCollectionMaps = await _context.SkillCollectionMaps.Where(scm => scm.SkillCollectionId == projectSkillCollection.SkillCollectionId).ToListAsync();

                SkillCollection skillCollection = await _context.SkillCollections.Where(sc => sc.SkillCollectionId == projectSkillCollection.SkillCollectionId).FirstOrDefaultAsync();

                GetProjectSkillCollectionResponse skillCollectionToAdd = new GetProjectSkillCollectionResponse();
                skillCollectionToAdd.ProjectSkillCollectionId = projectSkillCollection.ProjectSkillCollectionId;
                skillCollectionToAdd.Name = skillCollection.Name;
                skillCollectionToAdd.Weight = projectSkillCollection.Weight;
                skillCollectionToAdd.Description = skillCollection.Description;

                //Retrieving the skills from the maps
                foreach (SkillCollectionMap skillCollectionMap in skillCollectionMaps)
                {
                    Skill skill = await _context.Skills.Where(s => s.SkillId == skillCollectionMap.SkillId).FirstOrDefaultAsync();

                    if(skill != null)
                    {
                        //Adding the skill to the response object
                        GetProjectSkillResponse skillToAdd = new GetProjectSkillResponse();
                        skillToAdd.SkillId = skill.SkillId;
                        skillToAdd.Name = skill.Name;
                        skillToAdd.Weight = projectSkillCollection.Weight;

                        skillCollectionToAdd.Skills.Add(skillToAdd);
                    }
                }

                response.Add(skillCollectionToAdd);
            }

            return response;
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

            return true;
        }

        public bool InviteCandidate(Guid userId, Guid ProjectId, Guid inviteeId, String message)
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

        public async Task<ProjectSkillCollection> CreateCollection(CreateSkillCollectionRequest request, Guid projectId)
        {
            //Creating the new SkillCollection object
            SkillCollection skillCollection = new SkillCollection();
            skillCollection.SkillCollectionId = new Guid();
            skillCollection.Name = request.Name;
            skillCollection.Description = request.Description;

            _context.SkillCollections.Add(skillCollection);

            await _context.SaveChangesAsync();

            foreach (AddExistingSkillRequest skillToAdd in request.Skills)
            {
                //Linking the skills with the skillCollection
                SkillCollectionMap skillCollectionMap = new SkillCollectionMap();
                skillCollectionMap.SkillCollectionMapId = new Guid();
                skillCollectionMap.SkillCollectionId = skillCollection.SkillCollectionId;
                skillCollectionMap.SkillId = skillToAdd.SkillId;

                _context.SkillCollectionMaps.Add(skillCollectionMap);
                await _context.SaveChangesAsync();

                //Adding the skills to projecSkills
                /*ProjectSkill projectSkill = new ProjectSkill();
                projectSkill.SkillId = skillToAdd.SkillId;
                projectSkill.ProjectId = projectId;
                projectSkill.Weight = request.Weight;

                await AddProjectSkill(projectSkill);*/
            }

            //Creating the projectSkill collection
            ProjectSkillCollection projectSkillCollection = new ProjectSkillCollection();
            projectSkillCollection.ProjectSkillCollectionId = new Guid();
            projectSkillCollection.SkillCollectionId = skillCollection.SkillCollectionId;
            projectSkillCollection.ProjectId = projectId;
            projectSkillCollection.Weight = request.Weight;

            //Saving the SkillCollection object on the database
            _context.ProjectSkillCollections.Add(projectSkillCollection);
            await _context.SaveChangesAsync();

            return projectSkillCollection;
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

        public async Task AddSkillToCollection(Guid skillId, Guid collectionId)
        {

        }

        public async Task<List<ProjectSkillCollection>> GetCollectionsByProject(Guid projectId)
        {
            List<ProjectSkillCollection> result = new List<ProjectSkillCollection>();

            return result;
        }

        public async Task<Skill> AddNewSkill(AddSkillRequest addSkillRequest)
        {
            //Adding the new skill
            Skill skill = new Skill();
            skill.SkillId = new Guid();
            skill.Name = addSkillRequest.Name;
            skill.Status = SkillStatus.Pending;
            _context.Skills.Add(skill);

            await _context.SaveChangesAsync();

            //Linking the skills with the categories
            foreach (GetCategoryByIdRequest category in addSkillRequest.Categories)
            {
                SkillCategory skillCategory = new SkillCategory();
                skillCategory.SkillCategoryId = new Guid();
                skillCategory.SkillId = skill.SkillId;

                //TODO: Check if the category exists before using the id
                skillCategory.CategoryId = category.CategoryId;

                _context.SkillCategories.Add(skillCategory);
                await _context.SaveChangesAsync();
            }

            return skill;
        }
    }
}
