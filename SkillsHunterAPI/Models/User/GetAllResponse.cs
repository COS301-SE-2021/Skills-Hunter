using System;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request

    public struct UserDetails{
        User Account;
        UserSkill[] skills;
        WorkExperience[] experiences;
    }
    public class GetAllResponse
    {
        public bool Success { get; set; }
        public string[] Errors { get; set; }
        public GetAllResponse(){
            Errors = new string[0];
        }
        public UserDetails[] Accounts  { get; set; }
    }
}