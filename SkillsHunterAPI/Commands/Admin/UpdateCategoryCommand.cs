using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Commands.Admin
{
    public class UpdateCategoryCommand : IRequest<UpdateCategoryResponse>
    {
        [Required(ErrorMessage = "Id is required")]
        public String Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
