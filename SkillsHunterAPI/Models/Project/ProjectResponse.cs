using System;
namespace SkillsHunterAPI.Models.Project.Response
{
    //This class will contain all the data that will be sent when a project is requested
    public class ProjectResponse
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Owner { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        public DateTime DateCreated { get; set; }
        public ProjectSkill[] ProjectSkills { get; set; }
    }
}
