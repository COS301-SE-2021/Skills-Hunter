using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains the attributes required to add a category into the system.
    public class AddCategoryRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
