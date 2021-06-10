using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Project
{
    public class Project
    {

        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Industry { get; set; }
        public string Owner { get; set; }
        public string Location { get; set; }
        public string Skills { get; set; }
        public bool OpenForApplication { get; set; }
    }
}
