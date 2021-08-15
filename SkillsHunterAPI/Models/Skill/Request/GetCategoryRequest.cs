using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to retrieve a category in the system
    public class GetCategoryRequest
    {   

        [Required(ErrorMessage = "Id is required")]
        public string Id { get; set; }
    }
}
