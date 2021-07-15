using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to add a skill to the system
    public class AddSkillRequest
    {
        public String Name { get; set; }
        public List<GetCategoryByIdRequest> Categories { get; set; }
    }
}
