using System;
using Microsoft.AspNetCore.Mvc;

namespace SkillsHunterAPI.Models.Project.Response
{
    //This class will contain all the data that will be sent when a project is requested
    public class ProjectResponse
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Owner { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        public DateTime DateCreated { get; set; }
        public ProjectSkill[] ProjectSkills { get; set; }

        //public static implicit operator ProjectResponse(Project v)
        //{
        //    throw new NotImplementedException();
        //}

        //public static explicit operator ProjectResponse(ActionResult<ProjectResponse> v)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
