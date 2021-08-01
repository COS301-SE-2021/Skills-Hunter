using System;

namespace SkillsHunterAPI.Models.Project
{   
    //This model entity class contains attributes that maps a skill to a collection
    public class ProjectSkillCollectionMap
    {
        public Guid ProjectSkillCollectionMapId { get; set; }
        public Guid ProjectSkillCollectionId { get; set; }
        public Guid SkillId { get; set; }
    }
}
