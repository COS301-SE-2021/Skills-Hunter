using System;
namespace SkillsHunterAPI.Models.User.Entity
{
    public class UserSkillCollectionMap
    {
        public Guid UserSkillCollectionMapId { get; set; }
        public Guid UserSkillCollectionId { get; set; }
        public Guid SkillId { get; set; }

        public UserSkillCollectionMap()
        {
        }
    }
}
