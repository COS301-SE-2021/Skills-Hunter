﻿using System;
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
        public string FirstName { get; set; }
        public string LastName {get;set;}
        public string Password{get; set;}
        public string Email{get;set;}
        public string PhoneNumber{get;set;}
        public DateTime StartDate{get;set;}
        public Boolean OpenForWork{get;set;}
        public UserType UserType{get;set;}
    }
}
