using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains all the attributes required to update a user in the system
    public class UpdateUserRequest
    {
        public string FirstName { get; set; }
        public string LastName {get;set; }
        public string Email {get; set; }
        public string PhoneNumber {get; set; }
        public DateTime StartDate {get; set; }
        public Boolean OpenForWork {get; set; }
    }
}
