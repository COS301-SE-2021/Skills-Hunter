using System;
namespace SkillsHunterAPI.Models.User.Response
{
    public class GetUserSkillResponse
    {
        public Guid skillId { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }
        public GetUserSkillResponse()
        {
        }
    }
}
