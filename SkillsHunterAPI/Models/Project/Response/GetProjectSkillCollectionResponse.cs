using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Project.Response;

namespace SkillsHunterAPI.Models.Project.Request
{
    public class GetProjectSkillCollectionResponse
    {
        Guid ProjectSkillCollectionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public List<GetProjectSkillResponse> Skills { get; set; }

        public GetProjectSkillCollectionResponse()
        {
        }
    }
}
