using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Queries
{
    public class GetSkillByIdQuery : IRequest<GetSkillResponse>
    {
        public Guid Id { get; }

        public GetSkillByIdQuery(Guid id)
        {
            Id = id;
        }

    }
}
