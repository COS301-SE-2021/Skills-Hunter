using System;

namespace SkillsHunterAPI.Models.Project
{
    //This model entity class contains attributes linking a skill to a project
    public class ProjectSkill
    {
        public Guid ProjectSkillId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid SkillId { get; set; }
        public int Weight { set; get; }
    }
}
