using System;

namespace SkillsHunterAPI.Models.Skill
{

    //This enum type describes the status of a skill that has been added to the system
    public enum SkillStatus
    {
        Accepted = 0,
        Pending = 1,
        Declined = 2,
    }

    //This model entity class contains attributes describing a skill
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
