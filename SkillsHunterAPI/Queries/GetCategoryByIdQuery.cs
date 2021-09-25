using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Queries
{
    public class GetCategoryByIdQuery : IRequest<GetCategoryResponse>
    {


        public Guid Id { get; }
        public GetCategoryByIdQuery(Guid id)
        {
            Id = id;
        }
    }
}
