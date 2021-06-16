using System;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class GetResponse
    {
        public bool Success { get; set; }
        public string[] Errors {get; set; }
        public GetResponse(){
            Errors = new string[0];
        }

        public User Account  {get; set; }
        public UserSkill[] Skills  {get; set; }
        public WorkExperience[] Experiences  {get; set; }
    }
}