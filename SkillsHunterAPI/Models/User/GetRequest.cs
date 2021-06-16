using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class GetUserRequest
    {
        Guid UserId  {get; set; }
    }
}
