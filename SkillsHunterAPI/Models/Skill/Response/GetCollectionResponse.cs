using SkillsHunterAPI.Models.Skill.Entity;
using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Skill{
    //This model response class contains attributes returned after processing a user's request to retrieve a collection
    public class GetCollectionResponse
    {
        public List<SkillCollection> collections { get; set; }

        public GetCollectionResponse()
        {
            collections = new List<SkillCollection>();
        }


    }
}