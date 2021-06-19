using System;

namespace SkillsHunterAPI.Models.Project
{
    public class InviteCandidateRequest{
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
    }
}