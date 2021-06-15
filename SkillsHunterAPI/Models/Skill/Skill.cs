using System;
namespace SkillsHunterAPI.Models
{
    public class Skill
    {
        public Guid SkillId { get; set; }
        public String Name { get; set; }
        public Guid CategoryId { get; set; }
    }
}
