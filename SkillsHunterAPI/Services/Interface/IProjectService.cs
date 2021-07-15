using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Skill;
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
        //This methods of this interface defined the operations that can be performed on Project and skill entities
        Task<IEnumerable<Project>> GetProjects();
        
        Task<Project> GetProject(Guid id);
        
        Task<IEnumerable<Project>> GetProjectsByOwnerId();
        
        Task<Project> CreateProject(Project project);
        
        Task UpdateProject(Guid id, Project project);
        
        Task DeleteProject(Guid id);

        Task AddProjectSkill(ProjectSkill projectSkill);
        
        Task RemoveProjectSkill(Guid projectSkillId);
        
        Task<ProjectSkill> GetProjectSkill(Guid ProjectID);
        
        Task<ProjectSkill> GetProjectSkillBySkillId(Guid SkillId, Guid ProjectId);
        
        Task<IEnumerable<ProjectSkill>> GetProjectSkills(Guid projectId);
        
        bool ApplyForProject(Guid userId,Guid projectId);
        
        bool InviteCandidate(Guid userId,Guid projectId, Guid inviteeId, String message);
        
        Task<Collection> CreateCollection(Collection request);

        Task<Collection> GetCollection(Guid CollectionId);
        
        Task<Collection> UpdateCollection(Collection request);

        Task RemoveCollection(Guid CollectionId);
        
        Task<CollectionMap> AddSkillToCollection(Guid SkillId,Guid CollectionId);
    
        Task<List<Collection>> GetCollectionsByProject(Guid ProjectId);
    }
}
