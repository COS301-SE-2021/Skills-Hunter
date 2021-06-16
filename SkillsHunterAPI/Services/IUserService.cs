using System;
using SkillsHunterAPI.Controllers.Requests;
using SkillsHunterAPI.Controllers.Responses;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services
{
    public interface IUserService
    {
        Task<RegisterResponse> register(RegisterRequest request);
    }
}
