using System;

namespace SkillsHunterAPI.Models.Project
{
    public class InviteCandidateRequest{
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid InviteeId { get; set; }
        public String Message { get; set; }
        public DateTime InviteDate { get; set; }
    }
}