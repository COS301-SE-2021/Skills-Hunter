using SkillsHunterAPI.Models.Project.Request;
using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Skill.Request
{
    public class CreateSkillCollectionRequest
    {
        public Guid ProjectSkillCollectionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public List<AddExistingSkillRequest> Skills { get; set;}
    }
}
