using System;
using SkillsHunterAPI.Models.User;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains attributes required to authenticate a user of the system
    public class AuthenticateRequest
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public String Email { get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        public String Password { get; set; }
    }
}
