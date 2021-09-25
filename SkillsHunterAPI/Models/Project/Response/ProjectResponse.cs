using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace SkillsHunterAPI.Models.Project.Response
{
    //This model response class contains attributes returned if a project is requested
    public class ProjectResponse
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Owner { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        public DateTime DateCreated { get; set; }
        public GetProjectSkillsResponse ProjectSkills { get; set; }

        public ProjectResponse()
        {
            ProjectSkills = new GetProjectSkillsResponse();
        }
    }
}
