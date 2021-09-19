using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.User.Entity
{
    public class InternalWorkExperience
    {
        public Guid InternalWorkExperienceId { get; set; }

        public Guid UserId { get; set; }

        public Guid ProjectId { get; set; }

        public string Role { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool CurrentlyWorking { get; set; }
    }
}
