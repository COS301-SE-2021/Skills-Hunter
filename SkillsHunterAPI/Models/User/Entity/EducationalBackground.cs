using System;
namespace SkillsHunterAPI.Models.User.Entity
{
    public class EducationalBackground
    {
        public Guid EducationalBackgroundId { get; set; }
        public Guid UserId { get; set; }
        public string Institution { get; set; }
        public string Degree { get; set; }
        public int Duration { get; set; }

        public EducationalBackground()
        {
        }
    }
}
