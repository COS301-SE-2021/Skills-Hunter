using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Project
{
    public class Project
    {
<<<<<<< HEAD
        public int Id { get; set; }
=======
        public Guid ProjectId { get; set; }
>>>>>>> develop_backend
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Owner { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
