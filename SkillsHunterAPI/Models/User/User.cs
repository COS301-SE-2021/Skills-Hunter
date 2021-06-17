using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.User
{

    public enum UserType
    {
        Candidate = 0,
        ProjectOwner = 1,
        Organisation = 2,
        Admin = 3
    }

    public class User
    {
        public Guid UserId {get; set; }
        public string Name {get; set; }
        public string Surname {get; set; }
        public string Email {get; set; }
        public string Password {get; set; }
        public string Phone {get; set; }
        public DateTime StartDate {get; set; }
        public Boolean OpenForWork {get; set; }
        public UserType UserType {get; set; }
    }
}
