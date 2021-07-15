using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains the attributes required to add a category into the system.
    public class AddCategoryRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
