using MediatR;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Queries;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Handlers
{
    
    
    public class GetSkillsHandler : IRequestHandler<GetSkillsQuery, GetSkillsResponse>
    {

        private readonly IAdminService _adminService;

        public GetSkillsHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<GetSkillsResponse> Handle(GetSkillsQuery request, CancellationToken cancellationToken)
        {
            
            // Get categories code here
            List<Skill> result = (List<Skill>)await _adminService.GetSkills();

            GetSkillsResponse response = new();

            response.skills = result;

            return response;

                


        }
    }
}
