using System;
namespace SkillsHunterAPI.Models.Skill.Entity
{
    public class SkillCategory
    {
        public Guid SkillCategoryId { get; set; }
        public Guid SkillId { get; set; }
        public Guid CategoryId { get; set; }
     }
}
