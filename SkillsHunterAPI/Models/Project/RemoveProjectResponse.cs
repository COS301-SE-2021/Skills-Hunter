using System;

namespace SkillsHunterAPI.Models.Project
{
    public class RemoveProjectResponse
    {
        public bool Success { get; set; }
        public Project Removed { get; set; }
    }
}
