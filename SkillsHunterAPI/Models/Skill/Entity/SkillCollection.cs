using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model entity class contains attributes describing Collection of skills
    public class SkillCollection
    {
        public Guid SkillCollectionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public Guid ProjectId { get; set; }
    }
}
