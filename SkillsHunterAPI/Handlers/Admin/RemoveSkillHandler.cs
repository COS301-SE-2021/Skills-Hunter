using MediatR;
using SkillsHunterAPI.Commands;
using SkillsHunterAPI.Commands.Admin;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Handlers.Admin
{
    public class RemoveSkillHandler : IRequestHandler<RemoveSkillCommand, RemoveSkillResponse>
    {
        private IAdminService _adminService;

        public RemoveSkillHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<RemoveSkillResponse> Handle(RemoveSkillCommand request, CancellationToken cancellationToken)
        {


               //Guid id = new Guid(request.SkillId);
            var result = await _adminService.RemoveSkill(request.SkillId);

            RemoveSkillResponse response = new RemoveSkillResponse()
            {
                Success = true,
                Removed = result
            };

            return response;
    
        }
    }
}
