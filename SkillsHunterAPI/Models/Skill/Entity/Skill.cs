using System;

namespace SkillsHunterAPI.Models.Skill
{

    public enum SkillStatus
    {
        Accepted = 0,
        Pending = 1,
        Declined = 2,
    }

    public class Skill
    {
        public Guid SkillId { get; set; }
        public String Name { get; set; }
        public Guid CategoryId { get; set; }
        public SkillStatus Status { get; set; }
        
        public Skill(){

        }

        public Skill(String _name,Guid _categoryId){
            Name = _name;
            CategoryId = _categoryId;
        }
    }
}
