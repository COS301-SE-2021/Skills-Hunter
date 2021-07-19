using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains the attributes required to add a category into the system.
    public class RemoveCategoryRequest
    {
        [Required(ErrorMessage = "Id is required")]
        public string Id { get; set; }
    }
}
