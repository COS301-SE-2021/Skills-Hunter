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
    public class GetCategoryByIdHandler : IRequestHandler<GetCategoryByIdQuery, GetCategoryResponse>
    {

        private IAdminService _adminService;

        public GetCategoryByIdHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public async Task<GetCategoryResponse> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {

            var result =  await _adminService.GetCategory(request.Id);

            if(result == null)
            {
                return null;
            }

            GetCategoryResponse response = new();

            response.Id = result.CategoryId;
            response.Name = result.Name;
            response.Description = result.Description;


            return response;
        }
    }
}
