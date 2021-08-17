using System;

namespace SkillsHunterAPI.Models.Skill
{
    public class AddSkillRequest
    {
        public String Name { get; set; }
        public Guid CategoryId { get; set; }
    }
}
