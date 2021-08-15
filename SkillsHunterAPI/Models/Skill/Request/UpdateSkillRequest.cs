using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains the attributes required to update a skill into the system.
    public class UpdateSkillRequest
    {
        [Required(ErrorMessage = "Id is required")]
        public String Id { get; set; }
        public String Name { get; set; }
        public String CategoryId { get; set; }
        public SkillStatus Status { get; set; }        
    }
}
