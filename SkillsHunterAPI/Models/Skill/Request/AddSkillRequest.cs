using System;
<<<<<<< HEAD
using System.ComponentModel.DataAnnotations;
=======
using System.Collections.Generic;
using SkillsHunterAPI.Models.Skill.Request;
>>>>>>> ac1b738580578a3c98d1f8859134f45a0820a8b0

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
