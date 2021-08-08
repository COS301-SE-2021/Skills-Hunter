using System;
using SkillsHunterAPI.Models.Project;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes return after processing the Administrator's request to retrieve all the collections in the system
    public class GetCollectionsResponse
    {
        public ProjectSkillCollection[] collections { get; set; }
    }
}
