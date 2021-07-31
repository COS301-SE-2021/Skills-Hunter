using System;
namespace SkillsHunterAPI.Models.User.Request
{
    public class AddUserSkillRequest
    {
        public String Name { get; set; }
        public int Weight { get; set; }
        public AddUserSkillRequest()
        {
        }
    }
}
