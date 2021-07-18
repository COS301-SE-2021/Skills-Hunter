using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Skill.Request
{
    public class AddSkillCollectionRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<GetSkillByIdRequest> Skills { get; set; }
    }
}
