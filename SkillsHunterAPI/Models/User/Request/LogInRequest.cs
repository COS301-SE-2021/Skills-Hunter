using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains the attributes required to log a user into the system
    public class LogInRequest
    {
        public String Email { get; set; }
        public String Password { get; set; }
    }
}
