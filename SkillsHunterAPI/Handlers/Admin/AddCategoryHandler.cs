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
    public class AddCategoryHandler : IRequestHandler<AddCategoryCommand, GetCategoryResponse>
    {
        private IAdminService _adminService;

        public AddCategoryHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<GetCategoryResponse> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
        {
            // Add category code here
            Category category = new Category();

            category.Name = request.Name;
            category.Description = request.Description;

            var result = await _adminService.AddCategory(category);

            GetCategoryResponse response = new GetCategoryResponse();

            response.Id = result.CategoryId;
            response.Name = result.Name;
            response.Description = result.Description;

            return response;
        }
    }
}
