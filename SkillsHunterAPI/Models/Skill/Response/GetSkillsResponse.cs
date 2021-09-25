using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Skill
{
    //This model reponse class contains attributes that are returned after processing a user's request to retrieve a skill in the system
    public class GetSkillsResponse
    {
        public List<Skill> skills { get; set; }

        public GetSkillsResponse()
        {
            skills = new List<Skill>();
        }
        
    }
}
