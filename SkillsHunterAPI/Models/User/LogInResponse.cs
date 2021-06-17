using System;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class LogInResponse
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public bool Validated {get; set; }
    }
}