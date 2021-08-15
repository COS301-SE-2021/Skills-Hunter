using System;

namespace SkillsHunterAPI.Models.Project
{
    //This model request class contains attributes required to invite a candidate to a project by a project owner
    public class InviteCandidateRequest
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid InviteeId { get; set; }
        public String Message { get; set; }
    }
}