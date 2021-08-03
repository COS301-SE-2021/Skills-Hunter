using System;

namespace SkillsHunterAPI.Models.User
{
    //This model entity class contains attributes describing an Image stored in the system
    public class Image
    {
        public Guid ImageId { get; set; }
        public Guid UserId { get; set; }
        public string Path { get; set; }
    }
}
