using System;

namespace SkillsHunterAPI.Models.Project
{
    //This model request class contains attributes required to remove a project from the system
    public class RemoveProjectRequest
    {
        public Guid ProjectId { get; set; }
    }
}
