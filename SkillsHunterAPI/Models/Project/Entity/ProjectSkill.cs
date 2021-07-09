using System;
namespace SkillsHunterAPI.Models.Project
{
    public class ProjectSkill
    {
        public Guid ProjectSkillId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid SkillId { get; set; }
        //public int Weight { set; get; }
    }
}
