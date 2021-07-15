using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains attribute required to delete User from the system
    public class DeleteRequest
    {
        Guid UserId {get; set; }
    }
}
