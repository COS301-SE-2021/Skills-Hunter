using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Commands.Admin
{
    public class UpdateSkillCommand : IRequest<UpdateSkillResponse>
    {
        [Required(ErrorMessage = "Id is required")]
        public String Id { get; set; }
        public String Name { get; set; }
        public String CategoryId { get; set; }
        public SkillStatus Status { get; set; }
    }
}
