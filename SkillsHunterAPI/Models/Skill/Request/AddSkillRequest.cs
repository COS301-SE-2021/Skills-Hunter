using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to add a skill to the system
    public class AddSkillRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public String Name { get; set; }
        [Required(ErrorMessage = "Category Id is required")]
        public Guid CategoryId { get; set; }

        public List<GetCategoryByIdRequest> Categories { get; set; }
    }
}
