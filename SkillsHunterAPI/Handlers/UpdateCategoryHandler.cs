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
    public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryCommand, UpdateCategoryResponse>
    {

        public IAdminService _adminService;

        public UpdateCategoryHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<UpdateCategoryResponse> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {

                // Update category code here
                Guid id = new Guid(request.Id);
                Category category = new Category();

                category.Name = request.Name;

                category.Description = request.Description;

                Category result = await _adminService.UpdateCategory(id, category);

                UpdateCategoryResponse response = new UpdateCategoryResponse()
                {
                   Id = result.CategoryId,
                   Name = result.Name,
                   Description = result.Description
                };

            return response;
        }
    }
}
