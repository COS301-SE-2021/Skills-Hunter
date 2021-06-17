using System;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class RegisterRequest
    {
        public string Name {get; set; }
        public string Surname {get;set;}
        public string Phone { get; set; }
        public string Email {get; set;}
        public string Password {get; set;}
        public UserType Role {get; set;}
    }
}
