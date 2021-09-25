using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Queries
{
    public class GetSkillsQuery : IRequest<GetSkillsResponse>
    {
    }
}
