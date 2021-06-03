using System;
namespace SkillsHunterAPI.Models
{
    public class User
    {
        public User() { }

        public int UserId { get; set; }

        public UserType Type { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Password { get; set; }

        public string EmailVerificationCode { get; set; }

        public string PhoneVerificationCode { get; set; }

        public bool PhoneVerified { get; set; }

        public bool EmailVerified { get; set; }
    }
}
