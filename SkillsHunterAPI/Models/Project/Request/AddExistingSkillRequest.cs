using System;
namespace SkillsHunterAPI.Models.Project.Request
{
    public class AddExistingSkillRequest
    {
        public Guid SkillId { get; set; }
        public int Weight { get; set; }
        public AddExistingSkillRequest()
        {
        }
    }
}
