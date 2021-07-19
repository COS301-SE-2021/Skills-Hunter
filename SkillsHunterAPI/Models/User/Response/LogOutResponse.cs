using System;

namespace SkillsHunterAPI.Models.User
{
    ////This model response class contains the attributes returned after processing a user's request to log out of the system
    public class LogOutResponse
    {
        public bool Success {get; set; }
        public string[] Errors {get; set; }
        public LogOutResponse(){
            Errors = new string[0];
        }
    }
}