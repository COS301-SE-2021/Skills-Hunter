using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to add a skill to the system
    public class AddSkillRequest
    {
        public String Name { get; set; }
        public List<Guid> Categories { get; set; }
    }
}
