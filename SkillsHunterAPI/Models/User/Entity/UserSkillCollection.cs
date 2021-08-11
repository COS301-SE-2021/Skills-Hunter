using System;
namespace SkillsHunterAPI.Models.User.Entity
{
    public class UserSkillCollection
    {
        public Guid UserSkillCollectionId { get; set; }
        public int Weight { get; set; }
        public Guid UserId { get; set; }

        public Guid SkillCollectionId { get; set; }

        public UserSkillCollection()
        {
        }
    }
}
