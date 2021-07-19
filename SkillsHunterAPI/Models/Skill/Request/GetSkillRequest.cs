using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains the attributes required to retrieve a skill in the system.
    public class GetSkillRequest
    {
        [Required(ErrorMessage = "Id is required")]
        public string Id { get; set; }
    }
}
