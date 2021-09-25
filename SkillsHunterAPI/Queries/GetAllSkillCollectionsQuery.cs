using MediatR;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Skill.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Queries
{
    public class GetAllSkillCollectionsQuery : IRequest<GetSkillCollectionResponse>
    {
    }
}
