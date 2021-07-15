using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.Project.Request
{

    //This model request class contains attributes that describe a project request
    public class ProjectRequest
    {
        public String ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Owner { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        public DateTime DateCreated { get; set; }
        public SkillRR[] ProjectSkills { get; set; }
    }
}
