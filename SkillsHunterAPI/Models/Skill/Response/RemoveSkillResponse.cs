using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains the attributes returned after processing a user's request to remove a skill from the system
    public class RemoveSkillResponse
    {
        public bool Success;
        public Skill Removed { get; set; }
    }
}
