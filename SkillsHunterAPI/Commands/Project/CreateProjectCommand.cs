using System;
using System.Collections.Generic;
using MediatR;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Models.Skill.Request;

namespace SkillsHunterAPI.Commands.Project
{
    public class CreateProjectCommand: IRequest<ProjectResponse>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Owner { get; set; }
        public string Location { get; set; }
        public bool OpenForApplication { get; set; }
        //public DateTime DateCreated { get; set; }
        public List<AddExistingSkillRequest> ExistingSkills { get; set; }
        public List<AddNewSkillRequest> NewSkills { get; set; }
        public List<CreateSkillCollectionRequest> SkillCollections { get; set; }
    }
}
