using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains the attributes required to update a category in the system.
    public class UpdateCategoryRequest
    {
        [Required(ErrorMessage = "Id is required")]
        public String Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
