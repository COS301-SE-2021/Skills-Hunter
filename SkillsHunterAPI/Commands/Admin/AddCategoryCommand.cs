using MediatR;
using SkillsHunterAPI.Models.Skill;
using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsHunterAPI.Commands.Admin
{
    //This model request class contains the attributes required to add a category into the system.
    public class AddCategoryCommand : IRequest<GetCategoryResponse>
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
