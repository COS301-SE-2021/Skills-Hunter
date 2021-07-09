using System;
namespace SkillsHunterAPI.Models.Skill
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Category(){

        }

        public Category(string _name,string _description){
            Name = _name;
            Description = _description;
        }
    }
}
