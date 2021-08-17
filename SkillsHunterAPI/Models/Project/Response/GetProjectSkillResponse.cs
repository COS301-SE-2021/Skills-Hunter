using System;
namespace SkillsHunterAPI.Models.Project.Response
{
    public class GetProjectSkillResponse
    {
        public Guid SkillId { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }

        public GetProjectSkillResponse()
        {
        }
    }
}
