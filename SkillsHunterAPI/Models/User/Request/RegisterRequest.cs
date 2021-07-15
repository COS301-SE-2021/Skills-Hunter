using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains the attributes required to register a user into the system
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name {get; set; }
        
        [Required(ErrorMessage = "Surname is required")]
        public string Surname {get;set;}
        
        [Required(ErrorMessage = "Phone number is required")]
        public string Phone { get; set; }
        
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email {get; set;}
        
        [Required(ErrorMessage = "Password is required")]
        public string Password {get; set;}
        
        [Required(ErrorMessage = "User type is required")]
        public UserType Role {get; set;}

        public DateTime StartDate {get; set; }
        
        public Boolean OpenForWork {get; set; }
    }
}
