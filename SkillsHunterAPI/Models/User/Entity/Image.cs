using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.User
{
    public class Image
    {
        public Guid ImageId { get; set; }
        public Guid UserId { get; set; }
        public string Base64Representation { get; set; }
    }
}
