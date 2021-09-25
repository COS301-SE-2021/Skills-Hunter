using MediatR;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Queries;
using SkillsHunterAPI.Services;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Handlers
{
    public class GetCategoriesHandler : IRequestHandler<GetCategoriesQuery, GetCategoriesResponse>
    {
        private readonly IAdminService _adminService;
        public GetCategoriesHandler(IAdminService adminService)
        {
            _adminService = adminService;
        }
        public async Task<GetCategoriesResponse> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {

                // Get categories code here
                List<Category> result = (List<Category>)await _adminService.GetCategories();

                GetCategoriesResponse response = new GetCategoriesResponse();
                response.category = result;
                return response;

        }

        /*Task<List<GetCategoriesResponse>> IRequestHandler<GetCategoriesQuery, List<GetCategoriesResponse>>.Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }*/
    }
}
