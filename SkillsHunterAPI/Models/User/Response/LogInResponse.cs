using System;

namespace SkillsHunterAPI.Models.User
{
    //This model response class contains the attributes returned after processing a user's request to log In to the system
    public class LogInResponse
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public bool Validated {get; set; }
    }
}