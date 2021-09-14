using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Project.Entity;

namespace SkillsHunterAPI.Models.Project.Response
{
    public class MatchCandidateResponse
    {
        public Guid UserId { get; set; }
        public String Name { get; set; }
        public String Surname { get; set; }
        public String Email { get; set; }
        public double Percentage { get; set; }
        public List<MatchingSkill> MatchingSkills { get; set; }

        public MatchCandidateResponse()
        {
            MatchingSkills = new List<MatchingSkill>();
        }
    }
}
