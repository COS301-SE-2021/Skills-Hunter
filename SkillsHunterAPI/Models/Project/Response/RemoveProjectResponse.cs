using System;

namespace SkillsHunterAPI.Models.Project
{
    //This model response class contains attributes that are returned after processing a project owners request to remove a project from the system 
    public class RemoveProjectResponse
    {
        public bool Success { get; set; }
        public Project Removed { get; set; }
    }
}
