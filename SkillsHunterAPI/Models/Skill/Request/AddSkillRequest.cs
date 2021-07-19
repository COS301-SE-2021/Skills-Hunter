using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to add a skill to the system
    public class AddSkillRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public String Name { get; set; }
        [Required(ErrorMessage = "Category Id is required")]
        public Guid CategoryId { get; set; }
    }
}
