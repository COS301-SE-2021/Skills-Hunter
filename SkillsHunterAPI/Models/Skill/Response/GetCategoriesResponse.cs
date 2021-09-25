using System;
using System.Collections.Generic;

namespace SkillsHunterAPI.Models.Skill
{
    //This model response class contains attributes returned after processing an administrators request of retrieving a category from the system
    public class GetCategoriesResponse
    {
        public List<Category> category { get; set; }

        public GetCategoriesResponse()
        {
            category = new List<Category>();
        }
    }
}
