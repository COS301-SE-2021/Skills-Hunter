using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Project.Request;

namespace SkillsHunterAPI.Models.User.Request
{
    public class AddUserSkillCollectionRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public List<AddExistingSkillRequest> Skills { get; set; }

        public AddUserSkillCollectionRequest()
        {
        }
    }
}
