using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Commands.Admin
{
    public class RemoveCategoryCommand : IRequest<RemoveCategoryResponse>
    {
        [Required(ErrorMessage = "Id is required")]
        public Guid CategoryId { get; set; }
    }
}
