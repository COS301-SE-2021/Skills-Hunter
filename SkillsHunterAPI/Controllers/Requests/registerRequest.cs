using System;
using SkillsHunterAPI.Models.User;
namespace SkillsHunterAPI.Controllers.Requests
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class registerRequest
    {
        public string firstName { get; set; }
        public string lastName {get;set;}
        public string password{get; set;}
        public string email{get;set;}
        public string phoneNumber{get;set;}
        public DateTime startDate{get;set;}
        public Boolean openForWork{get;set;}
        public UserType userType{get;set;}
        public Guid[] skills{get;set;}
        public WorkExperience[] experience{get;set;}
    }
}
