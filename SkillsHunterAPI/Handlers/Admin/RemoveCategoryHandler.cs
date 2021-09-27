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
    public class RemoveCategoryHandler : IRequestHandler<RemoveCategoryCommand, RemoveCategoryResponse>
    {

        public IAdminService _adminService;

        public RemoveCategoryHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<RemoveCategoryResponse> Handle(RemoveCategoryCommand request, CancellationToken cancellationToken)
        {


                Category result = await _adminService.RemoveCategory(request.CategoryId);

                RemoveCategoryResponse response= new RemoveCategoryResponse()
                {
                    Id = result.CategoryId,
                    Name = result.Name,
                    Description = result.Description
                };
            return response;

        }
    }
}
