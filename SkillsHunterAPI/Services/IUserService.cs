﻿using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services
{
    public interface IUserService
    {
        Task<RegisterResponse> Register(RegisterRequest request);
    }
}
