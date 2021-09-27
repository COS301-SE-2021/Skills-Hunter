using MediatR;
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
    public class CreateSkillHandler : IRequestHandler<AddSkillCommand, GetSkillResponse>
    {

        private IAdminService _adminService;

        public CreateSkillHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<GetSkillResponse> Handle(AddSkillCommand request, CancellationToken cancellationToken)
        {
            Skill skill = new Skill();
            skill.Name = request.Name;
            skill.Status = SkillStatus.Accepted;

            var result = await _adminService.CreateSkill(skill);

            //Link skill with Categories
            await _adminService.AddCategoriesToSkill(skill.SkillId, request.Categories);

            //Create response
            GetSkillResponse response = new();
            response.Id = result.SkillId;
            response.Name = result.Name;
            response.Status = result.Status;

            return response;
        }
    }
}
