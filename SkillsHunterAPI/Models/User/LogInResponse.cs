using System;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class LogInResponse
    {
        public bool Success {get; set; }
        public string[] Errors {get; set; }
        public LogInResponse(){
            Errors = new string[0];
        }
    }
}