using MediatR;
using SkillsHunterAPI.Commands;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Handlers
{
    public class UpdateSkillHandler : IRequestHandler<UpdateSkillCommand, UpdateSkillResponse>
    {

        public IAdminService _adminService;
        public UpdateSkillHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<UpdateSkillResponse> Handle(UpdateSkillCommand request, CancellationToken cancellationToken)
        {

                // Update skill code here
                Guid id = new Guid(request.Id);
                Skill skill = new Skill();

                skill.Name = request.Name;

                //skill.CategoryId = new Guid(request.CategoryId);
                skill.Status = request.Status;

                Skill result = await _adminService.UpdateSkill(id, skill);

                UpdateSkillResponse response = new UpdateSkillResponse()
                {
                    Id = result.SkillId,
                    Name = result.Name,
                    Status = result.Status
                };
            return response;

        }
    }
}
