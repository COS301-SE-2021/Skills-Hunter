using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class RegisterRequest
    {
        [Required]
        public string Name {get; set; }
        
        [Required]
        public string Surname {get;set;}
        
        [Required]
        public string Phone { get; set; }
        
        [Required]
        public string Email {get; set;}
        
        [Required]
        public string Password {get; set;}
        
        [Required]
        public UserType Role {get; set;}
    }
}
