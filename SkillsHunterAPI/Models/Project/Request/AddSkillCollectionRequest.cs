using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Project.Request
{
    public class AddSkillCollectionRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public List<AddExistingSkillRequest> Skills { get; set; }
    }
}
