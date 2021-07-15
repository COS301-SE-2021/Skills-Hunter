using System;

namespace SkillsHunterAPI.Models.Skill
{   
    //This model entity class contains attributes that maps a skill to a collection
    public class CollectionMap
    {
        public Guid CollectionMapId { get; set; }
        public Guid CollectionId { get; set; }
        public Guid SkillId { get; set; }
    }
}
