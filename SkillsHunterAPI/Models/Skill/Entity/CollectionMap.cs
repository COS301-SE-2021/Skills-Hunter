using System;
namespace SkillsHunterAPI.Models.Skill
{
    public class CollectionMap
    {
        public Guid CollectionMapId { get; set; }
        public Guid CollectionId { get; set; }
        public Guid SkillId { get; set; }
    }
}
