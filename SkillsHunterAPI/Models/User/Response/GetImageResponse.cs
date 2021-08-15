using System;

namespace SkillsHunterAPI.Models.User
{
    //This model response class contains the attributes returned after processing a user's request to retrieve an image in the system
    public class GetImageResponse
    {
        public Image result { get; set; }
    }
}
