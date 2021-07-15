using System;

namespace SkillsHunterAPI.Models.User
{
    //This model entity class contains attributes describing a user's work experience
    public class WorkExperience
    {
        public Guid WorkExperienceId {get; set; }
        
        public Guid ProjectId {get; set; } 
        
        public DateTime startDate {get; set; }
        
        public DateTime endDate {get; set; }
        
        public int performanceRating {get; set; }
    }
}
