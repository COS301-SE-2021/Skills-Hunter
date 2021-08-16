using System;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains attributes required to retrieve an image by user 
    public class GetImageByUserRequest
    {
        public string UserId { get; set; }
    }
}
