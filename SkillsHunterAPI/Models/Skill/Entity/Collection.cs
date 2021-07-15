using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model entity class contains attributes describing Collection of skills
    public class Collection
    {
        public Guid CollectionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
    }
}
