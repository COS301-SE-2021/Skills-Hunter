using System;
using System.Collections.Generic;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.User;

namespace SkillsHunterAPI.Models.User
{
    //This model request class contains all the attributes required to update a user in the system
    public class UpdateUserRequest
    {

        //public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Surname {get;set; }
        public string Email {get; set; }
        public string PhoneNumber {get; set; }
        public DateTime StartDate {get; set; }
        public Boolean OpenForWork {get; set; }
        public string LinkedIn { get; set; }
        public string Github { get; set; }
        public List<ExternalWorkExperience> ExternalWorkExperiences { get; set; }
        public List<AddExistingSkillRequest> UserSkills { get; set; }

        public UpdateUserRequest()
        {
            ExternalWorkExperiences = new List<ExternalWorkExperience>();
            UserSkills = new List<AddExistingSkillRequest>();
        }
    }
}
