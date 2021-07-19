using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes returned after processing an administrators request of updating a skill in the system
    public class UpdateSkillResponse
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public Guid CategoryId { get; set; }
        public SkillStatus Status { get; set; }           
    }
}
