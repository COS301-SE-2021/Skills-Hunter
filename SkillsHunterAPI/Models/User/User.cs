using System;
namespace SkillsHunterAPI.Models.User
{


    public enum UserType{
        Candidate = 0,
        ProjectOwner = 1,
        Organisation = 2,
        Admin = 3
    }
    public class User
    {
        public Guid UserId { get; set; }
        public string firstName { get; set; }
        public string lastName {get;set;}
        public string password{get; set;}
        public string email{get;set;}
        public string phoneNumber{get;set;}
        public DateTime startDate{get;set;}
        public Boolean openForWork{get;set;}
        public UserType userType{get;set;}
    }
}
