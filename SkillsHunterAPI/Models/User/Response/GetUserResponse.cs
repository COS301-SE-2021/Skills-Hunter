using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.User.Response;

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
        public string Github { get; set; }
        public string LinkedIn { get; set; }
        public DateTime StartDate { get; set; }
        public Boolean OpenForWork { get; set; }
        public UserType UserType { get; set; }
        public List<GetUserSkillResponse> UserSkills { get; set; }
        public List<ExternalWorkExperience> ExternalWorkExperiences { get; set; }

        public GetUserResponse()
        {
            UserSkills = new List<GetUserSkillResponse>();
            ExternalWorkExperiences = new List<ExternalWorkExperience>();
        }
    }
}