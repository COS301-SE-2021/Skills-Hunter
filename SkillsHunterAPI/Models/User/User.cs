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
    }
}
