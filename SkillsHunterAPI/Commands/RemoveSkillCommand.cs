using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Commands
{
    public class RemoveSkillCommand : IRequest<RemoveSkillResponse>
    {
        public Guid SkillId { get; set; }
    }
}
