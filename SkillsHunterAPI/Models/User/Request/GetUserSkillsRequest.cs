using System;
namespace SkillsHunterAPI.Models.User.Request
{
    public class GetUserSkillsRequest
    {
        public Guid UserId { get; set; }
        public GetUserSkillsRequest()
        {
        }
    }
}
