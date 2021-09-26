﻿using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Services
{
    public interface IProjectService
    {
        //This methods of this interface defined the operations that can be performed on Project and skill entities
        Task<List<Project>> GetProjects();

        Task<Project> GetProject(Guid id);

        Task<List<Project>> GetProjectsByOwnerId(Guid ownerId);

        Task<Project> CreateProject(Project project);

        Task UpdateProject(Guid id, Project project);

        Task DeleteProject(Guid id);

        Task AddProjectSkill(ProjectSkill projectSkill);

        Task RemoveProjectSkill(Guid projectSkillId);

        Task<ProjectSkill> GetProjectSkill(Guid ProjectID);

        Task<GetProjectSkillResponse> GetProjectSkill(Guid SkillId, Guid ProjectId);

        Task<List<GetProjectSkillResponse>> GetProjectSkillsByProjectId(Guid projectId);

        Task<List<GetProjectSkillCollectionResponse>> GetProjectSkillCollectionsByProjectId(Guid projectId);

        bool ApplyForProject(Guid userId,Guid projectId);
        
        bool InviteCandidate(Guid userId,Guid projectId, Guid inviteeId, String message);
        
        Task<ProjectSkillCollection> CreateCollection(CreateSkillCollectionRequest request, Guid projectId);

        Task<ProjectSkillCollection> GetCollection(Guid CollectionId);

        Task<ProjectSkillCollection> UpdateProjectSkillCollection(CreateSkillCollectionRequest request);

        Task RemoveCollection(Guid CollectionId);

        Task AddSkillToCollection(Guid SkillId, Guid CollectionId);

        Task<List<ProjectSkillCollection>> GetCollectionsByProject(Guid ProjectId);

        Task<Skill> AddNewSkill(AddSkillRequest addSkillRequest);


        //Matching algorithm
        Task<List<MatchCandidateResponse>> MatchCandidates(Guid projectId, string userId = null);

        Task<List<GetApplicationsResponse>> GetApplicationsByProjectId(Guid projectId);

        Task<IEnumerable<Invitation>> GetInvitationsByProjectId(Guid projectId);


    }
}
