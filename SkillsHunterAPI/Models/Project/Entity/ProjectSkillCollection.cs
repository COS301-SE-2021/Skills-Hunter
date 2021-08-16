using System;

namespace SkillsHunterAPI.Models.Project
{
    //This model entity class contains attributes describing Collection of skills
    public class ProjectSkillCollection
    {
        public Guid ProjectSkillCollectionId { get; set; }
        public Guid SkillCollectionId { get; set; }
        public int Weight { get; set; }
        public Guid ProjectId { get; set; }
    }
}
