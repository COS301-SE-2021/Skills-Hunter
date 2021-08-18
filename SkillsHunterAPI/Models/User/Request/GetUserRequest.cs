using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains attributes required to retrieve a user from the system
    public class GetUserRequest
    {
        public Guid UserId  {get; set; }
    }
}
