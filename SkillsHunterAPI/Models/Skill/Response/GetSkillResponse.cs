using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes returned after processing an administrators request of adding a category to the system
    public class GetSkillResponse
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public Guid CategoryId { get; set; }
        public SkillStatus Status { get; set; }
    }
}
