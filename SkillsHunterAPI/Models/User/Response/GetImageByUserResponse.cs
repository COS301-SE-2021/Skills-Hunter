using System;

namespace SkillsHunterAPI.Models.User
{
    //This model response class contains the attributes that are returned after processing a users request to retrieve an image by user id
    public class GetImageByUserResponse
    {
        public Image result { get; set; }
    }
}
