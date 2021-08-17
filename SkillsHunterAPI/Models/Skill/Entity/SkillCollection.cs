using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Skill.Entity
{
    public class SkillCollection
    {
        public Guid SkillCollectionId { get; set; }

        public String Name { get; set; }

        public String Description { get; set; }

    }
}
