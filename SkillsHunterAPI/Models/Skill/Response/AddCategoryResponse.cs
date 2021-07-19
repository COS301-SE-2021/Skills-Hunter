using System;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes returned after processing an administrators request of adding a category to the system
    public class AddCategoryResponse
    {
        public bool Success  { get; set; }
        public Category Added  { get; set; }
    }
}
