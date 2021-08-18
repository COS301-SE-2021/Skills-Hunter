using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes returned after processing an administrators request of retrieving a category from the system
    public class GetCategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
