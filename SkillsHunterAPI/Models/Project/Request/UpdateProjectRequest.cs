﻿using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Models.Project.Request
{
    public class UpdateProjectRequest
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        public List<AddExistingSkillRequest> ExistingSkills { get; set; }
        public List<AddNewSkillRequest> NewSkills { get; set; }
        public List<CreateSkillCollectionRequest> SkillCollections { get; set; }

        public UpdateProjectRequest()
        {
        }
    }
}
