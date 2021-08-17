using System;

namespace SkillsHunterAPI.Models.Skill
{
    public class RemoveSkillResponse
    {
        public bool Success;
        public Skill Removed { get; set; }
    }
}
