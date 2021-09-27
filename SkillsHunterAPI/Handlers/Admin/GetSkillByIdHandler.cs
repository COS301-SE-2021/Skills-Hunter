using MediatR;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Queries;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Handlers.Admin
{
    public class GetSkillByIdHandler : IRequestHandler<GetSkillByIdQuery, GetSkillResponse>
    {

        private IAdminService _adminService;

        public GetSkillByIdHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }
        
        public async Task<GetSkillResponse> Handle(GetSkillByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _adminService.GetSkill(request.Id);

            if (result == null)
            {
                return null;
            }

            GetSkillResponse response = new();

            response.Id = result.SkillId;
            response.Name = result.Name;
            response.Status = result.Status;


            return response;
        }
    }
}
