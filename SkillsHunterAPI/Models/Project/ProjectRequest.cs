using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.Project.Request
{

    //This class will be used to contain all the Project data that is sent through with a Project creation or update request
    public class ProjectRequest
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Owner { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        public DateTime DateCreated { get; set; }
        public SkillRR[] ProjectSkills { get; set; }
    }
}
