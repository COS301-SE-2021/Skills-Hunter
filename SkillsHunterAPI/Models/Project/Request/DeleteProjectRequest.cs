using System;

namespace SkillsHunterAPI.Models.Project
{
    //This model request class contains the attribute required to delete a project from the system
    public class DeleteProjectRequest
    {
        public Guid ProjectId { get; set; }
    }
}
