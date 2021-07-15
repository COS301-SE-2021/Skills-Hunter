using System;

namespace SkillsHunterAPI.Models.User
{
    //This model response class contains the attributes returned after processing a user's request to delete a user from the system
    public class DeleteResponse
    {
        public bool Success { get; set; }
        public string[] Errors { get; set; }
        public DeleteResponse(){
            Errors = new string[0];
        }
    }
}