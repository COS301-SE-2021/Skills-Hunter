using System;

namespace SkillsHunterAPI.Models.User
{
    public class UserSkill
    {
        public Guid UserSkillId { get; set; }
        public Guid SkillID {get; set; }

        public int Weight  {get; set; }
    }
}
