using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Skill.Request;
using MediatR;

namespace SkillsHunterAPI.Models.Skill
{
    //This model request class contains attributes required to add a skill to the system
    public class AddSkillCommand :IRequest<GetSkillResponse>
    {
        [Required(ErrorMessage = "Name is required")]
        public String Name { get; set; }
        [Required(ErrorMessage = "Category Id is required")]

        public List<GetCategoryByIdRequest> Categories { get; set; }
    }
}
