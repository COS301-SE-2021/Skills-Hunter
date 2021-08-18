using System;

namespace SkillsHunterAPI.Models.User
{
    //This model entity class contains attributes linking a user to a skill
    public class UserSkill
    {
        public Guid UserSkillId { get; set; }
        public Guid UserId { get; set; }
        public Guid SkillId { get; set; }
        public int Weight  { get; set; }
    }
}
