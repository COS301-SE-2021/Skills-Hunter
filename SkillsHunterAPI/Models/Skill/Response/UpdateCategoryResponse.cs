using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes returned after processing an administrators request of updating a category in the system
    public class UpdateCategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }        
    }
}
