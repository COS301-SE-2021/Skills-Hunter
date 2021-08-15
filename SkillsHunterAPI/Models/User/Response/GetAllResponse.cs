using System;

namespace SkillsHunterAPI.Models.User
{
    //This model response class contains the attributes returned after processing a user's request to get all the users in the system
    public class GetAllResponse
    {
        public bool Success { get; set; }
        public string[] Errors { get; set; }
        public GetAllResponse(){
            Errors = new string[0];
        }
        public User[] Accounts  { get; set; }
    }
}