using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.User
{

    //This enum type represents the type that a user can be
    public enum UserType
    {
        Candidate = 0,
        ProjectOwner = 1,
        Organisation = 2,
        Admin = 3
    }

    //This model entity class attributes related to the user of the system
    public class User
    {
        public Guid UserId {get; set; }
        public string Name {get; set; }
        public string Surname {get; set; }
        public string Email {get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Phone {get; set; }
        public DateTime StartDate {get; set; }
        public Boolean OpenForWork {get; set; }
        public UserType UserType {get; set; }
    }
}
