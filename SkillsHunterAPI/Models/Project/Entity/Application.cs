using System;

namespace SkillsHunterAPI.Models.Project
{
    //This enum type is used to represent the status of a Candidates application for a project
    public enum ApplicationStatus
    {
        Accepted = 0,
        Pending = 1,
        Declined = 2
    }

    //This model entity contains data about a candidates application for a project
    public class Application
    {
        public Guid ApplicationId { get; set; }
        public Guid ApplicantId { get; set; }
        public Guid ProjectId { get; set; }
        public ApplicationStatus Status { get; set; }
    }
}
