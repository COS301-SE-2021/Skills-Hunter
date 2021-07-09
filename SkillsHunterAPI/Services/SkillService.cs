using SkillsHunterAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill;

namespace SkillsHunterAPI.Services
{
    public class SkillService : ISkillService
    {
        public Task AddSkill(string name)
        {
            throw new NotImplementedException();
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

        public async Task<Collection> CreateCollection(Collection request){
            Collection result = null;


            return result;
        }

        public async Task<Collection> GetCollection(Guid CollectionId){
            Collection result = null;


            return result;
        }
        
        public async Task<Collection> UpdateCollection(Collection request){
            Collection result = null;


            return result;
        }

        public async Task RemoveCollection(Guid CollectionId){
            
        }

        public async Task<CollectionMap> AddSkillToCollection(Guid SkillId,Guid CollectionId){
            CollectionMap result = null;

            return result;
        }

        public async Task<List<Collection>> GetCollectionsByProject(Guid ProjectId){
            List<Collection> result = new List<Collection>();
        
            return result;
        }
    }
}
