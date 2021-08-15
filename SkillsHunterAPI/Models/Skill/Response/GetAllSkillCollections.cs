using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Models.Skill.Response
{
    public class GetAllSkillCollections
    {
        public Guid SkillCollectionId { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public int Weight { get; set; }
        public List<GetSkillResponse> Skills { get; set; }

        public GetAllSkillCollections()
        {
        }
    }
}
