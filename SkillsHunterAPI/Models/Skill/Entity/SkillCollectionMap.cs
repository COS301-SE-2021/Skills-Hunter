using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Skill.Entity
{
    public class SkillCollectionMap
    {
        public Guid SkillCollectionMapId { get; set; }
        public Guid SkillCollectionId { get; set; }
        public Guid SkillId { get; set; }
    }
}
