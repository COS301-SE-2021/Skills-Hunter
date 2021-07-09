using System;
namespace SkillsHunterAPI.Models.Project
{

    public enum ApplicationStatus
    {
        Accepted = 0,
        Pending = 1,
        Declined = 2
    }

    public class Application
    {
        public Guid ApplicationId { get; set; }
        public Guid ApplicantId { get; set; }
        public Guid ProjectId { get; set; }
        public ApplicationStatus Status { get; set; }
    }
}
