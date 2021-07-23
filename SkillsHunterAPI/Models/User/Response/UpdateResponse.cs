using System;

namespace SkillsHunterAPI.Models.User
{
    ////This model response class contains the attributes returned after processing a user's request to update a user
    public class UpdateResponse
    {
        public bool Success{get;set;}
        public string[] Errors{get;set;}
        public UpdateResponse(){
            Errors = new string[0];
        }
    }
}