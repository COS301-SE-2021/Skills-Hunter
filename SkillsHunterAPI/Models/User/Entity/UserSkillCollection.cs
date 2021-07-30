using System;
namespace SkillsHunterAPI.Models.User.Entity
{
    public class UserSkillCollection
    {
        public Guid UserSkillCollectionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public Guid UserId { get; set; }

        public UserSkillCollection()
        {
        }
    }
}
