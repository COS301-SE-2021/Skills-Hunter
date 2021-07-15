using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to add a skill to the system
    public class AddSkillRequest
    {
        public String Name { get; set; }
        public Guid CategoryId { get; set; }
    }
}
