using System;
namespace SkillsHunterAPI.Models.Skill
{
    public class Collection
    {
        public Guid CollectionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
    }
}
