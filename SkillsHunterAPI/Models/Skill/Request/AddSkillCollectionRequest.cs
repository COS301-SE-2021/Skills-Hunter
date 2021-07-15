using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Skill.Request
{
    public class AddSkillCollectionRequest
    {
        public string Name { get; set; }

        public List<Guid> Skills { get; set; }
    }
}
