using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to remove a skill from the system
    public class RemoveSkillRequest
    {
        public string SkillId { get; set; }
    }
}
