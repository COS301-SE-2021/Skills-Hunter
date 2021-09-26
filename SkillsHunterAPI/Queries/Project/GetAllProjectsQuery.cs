using System;
using System.Collections.Generic;
using MediatR;
using SkillsHunterAPI.Models.Project.Response;

namespace SkillsHunterAPI.Queries.Project
{
    public class GetAllProjectsQuery: IRequest<List<ProjectResponse>>
    {
        
        public GetAllProjectsQuery()
        {
        }
    }
}
