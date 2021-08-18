using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Project.Request;

namespace SkillsHunterAPI.Models.Project.Response
{
    public class GetProjectSkillsResponse
    {
        public List<GetProjectSkillResponse> Skills { get; set; }
        public List<GetProjectSkillCollectionResponse> SkillCollections {get; set;}
        public GetProjectSkillsResponse()
        {
        }
    }
}
