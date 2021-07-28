using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes returned after processing a user's request of adding a skill into the system
    public class AddSkillResponse
    {
        public Skill Added { get; set; }
    }
}
