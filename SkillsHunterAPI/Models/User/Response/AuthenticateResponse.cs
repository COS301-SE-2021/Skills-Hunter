using System;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This model response class contains the attributes returned after authenticating a user
    public class AuthenticateResponse
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public Boolean OpenForWork { get; set; }
        public UserType Role { get; set; }
        public string Token { get; set; }
    }
}
