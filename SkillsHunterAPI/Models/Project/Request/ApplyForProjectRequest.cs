using System;

namespace SkillsHunterAPI.Models.Project
{
    //This model request class contains attributes required for the application of a project by a candidate
    public class ApplyForProjectRequest
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
    }
}