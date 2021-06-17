using System;
using Microsoft.AspNetCore.Identity;
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

    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName {get;set;}
        public DateTime StartDate{get;set;}
        public Boolean OpenForWork{get;set;}
        public UserType UserType{get;set;}
    }
}
