using MediatR;
using SkillsHunterAPI.Models.Skill.Response;
using SkillsHunterAPI.Queries;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Handlers.Admin
{
    public class GetAllSkillCollectionsHandler : IRequestHandler<GetAllSkillCollectionsQuery, GetSkillCollectionResponse>
    {

        private IAdminService _adminService;

        public GetAllSkillCollectionsHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }


        public async Task<GetSkillCollectionResponse> Handle(GetAllSkillCollectionsQuery request, CancellationToken cancellationToken)
        {
                // Get collections code here
                var result = await _adminService.getAllSkillCollections();

            GetSkillCollectionResponse response = new();
            //response.Name = result.;

            return response;

        }
    }
}
