using System;

namespace SkillsHunterAPI.Models.Project
{
    public class ApplyForProjectRequest{
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
    }
}