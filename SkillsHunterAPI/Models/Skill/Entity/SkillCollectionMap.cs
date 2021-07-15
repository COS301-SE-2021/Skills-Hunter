using System;

namespace SkillsHunterAPI.Models.Skill
{   
    //This model entity class contains attributes that maps a skill to a collection
    public class SkillCollectionMap
    {
        public Guid SkillCollectionMapId { get; set; }
        public Guid SkillCollectionId { get; set; }
        public Guid SkillId { get; set; }
    }
}
