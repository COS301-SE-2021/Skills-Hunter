using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Models.Project.Request
{
    public class AddNewSkillRequest
    {
        public String Name { get; set; }
        public List<GetCategoryByIdRequest> Categories { get; set; }
        public int Weight { get; set; }

        public AddNewSkillRequest()
        {
        }
    }
}
