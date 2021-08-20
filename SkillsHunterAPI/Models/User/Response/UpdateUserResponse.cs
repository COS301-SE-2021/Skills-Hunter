using System;

namespace SkillsHunterAPI.Models.User
{
    ////This model response class contains the attributes returned after processing a user's request to update a user
    public class UpdateUserResponse
    {
        public bool Success{get;set;}
        public string[] Errors{get;set;}
        public UpdateUserResponse(){
            Errors = new string[0];
        }
    }
}