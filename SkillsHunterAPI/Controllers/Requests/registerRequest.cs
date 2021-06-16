using System;
using SkillsHunterAPI.Models.User;
namespace SkillsHunterAPI.Controllers.Requests
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class RegisterRequest
    {
        public string FirstName { get; set; }
        public string LastName {get;set;}
        public string Password{get; set;}
        public string Email{get;set;}
        public string PhoneNumber{get;set;}
        public DateTime StartDate{get;set;}
        public Boolean OpenForWork{get;set;}
        public UserType UserType{get;set;}
        public Guid[] Skills{get;set;}
        public WorkExperience[] Experience{get;set;}
    }
}
