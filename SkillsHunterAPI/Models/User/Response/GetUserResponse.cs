using System;

namespace SkillsHunterAPI.Models.User
{
    //This model response class contains the attributes returned after processing a user's request to retrieve a user in the system
    public class GetUserResponse
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public DateTime StartDate { get; set; }
        public Boolean OpenForWork { get; set; }
        public UserType UserType { get; set; }
    }
}