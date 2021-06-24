using System;
using SkillsHunterAPI.Models.User;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class AuthenticateRequest
    {
        [Required]
        public String Email { get; set; }
        
        [Required]
        public String Password { get; set; }
    }
}
