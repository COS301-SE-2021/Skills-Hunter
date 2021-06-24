using System;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class RegisterResponse
    {
        public bool Success { get; set; }
        public string[] Errors { get; set; }
        
        RegisterResponse(){
            Success = false;
            Errors = new string[0];
        }
    }
}