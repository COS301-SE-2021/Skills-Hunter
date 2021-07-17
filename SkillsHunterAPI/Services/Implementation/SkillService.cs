using SkillsHunterAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Data;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Models.Skill.Entity;

namespace SkillsHunterAPI.Services
{
    public class SkillService : ISkillService
    {
        private readonly ApplicationDbContext _context;

        public SkillService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Skill> AddSkill(AddSkillRequest addSkillRequest)
        {
            //Adding the new skill
            Skill skill = new Skill();
            skill.SkillId = new Guid();
            skill.Name = addSkillRequest.Name;
            skill.Status = SkillStatus.Pending;
            _context.Skills.Add(skill);

            await _context.SaveChangesAsync();

            //Linking the skills with the categories
            foreach (GetCategoryByIdRequest category in addSkillRequest.Categories)
            {
                SkillCategory skillCategory = new SkillCategory();
                skillCategory.SkillCategoryId = new Guid();
                skillCategory.SkillId = skill.SkillId;

                //TODO: Check if the category exists before using the id
                skillCategory.CategoryId = category.CategoryId;

                _context.SkillCategories.Add(skillCategory);
                await _context.SaveChangesAsync();
            }

            return skill;
        }

        public Task<Skill> GetSkill(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Skill>> GetSkills()
        {
            throw new NotImplementedException();
        }

        public Task RemoveSkill(Guid SkillId)
        {
            throw new NotImplementedException();
        }

    }
}
