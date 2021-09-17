using System;

namespace SkillsHunterAPI.Models.User
{
    //This model entity class contains attributes describing a user's work experience
    public class ExternalWorkExperience
    {
        public Guid ExternalWorkExperienceId {get; set; }
        
        public Guid UserId {get; set; }

        public string Role { get; set; }

        public string Description { get; set; }

        public DateTime StartDate {get; set; }
        
        public DateTime EndDate {get; set; }
    }
}
