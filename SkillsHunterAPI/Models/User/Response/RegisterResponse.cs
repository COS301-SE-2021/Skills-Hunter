using System;

namespace SkillsHunterAPI.Models.User
{
    ////This model response class contains the attributes returned after processing a user's request to register into the system
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