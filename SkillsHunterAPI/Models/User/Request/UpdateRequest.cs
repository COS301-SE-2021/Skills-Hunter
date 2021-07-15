using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains all the attributes required to update a user in the system
    public class UpdateRequest
    {
        public string FirstName { get; set; }
        public string LastName {get;set; }
        public string Password {get; set; }
        public string Email {get; set; }
        public string PhoneNumber {get; set; }
        public DateTime StartDate {get; set; }
        public Boolean OpenForWork {get; set; }
        public UserType UserType {get; set; }
        public Guid[] Skills {get; set; }
        public WorkExperience[] Experience {get; set; }
    }
}
