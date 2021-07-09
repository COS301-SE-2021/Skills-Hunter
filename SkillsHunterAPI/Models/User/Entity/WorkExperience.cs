using System;
namespace SkillsHunterAPI.Models.User
{
    public class WorkExperience
    {
        public Guid WorkExperienceId {get; set; }
        
        public Guid ProjectId {get; set; } 
        
        public DateTime startDate {get; set; }
        
        public DateTime endDate {get; set; }
        
        public int performanceRating {get; set; }
    }
}
