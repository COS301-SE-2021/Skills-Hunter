using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.User;
using System.Collections.Generic;
using SkillsHunterAPI.Data;

namespace SkillsHunterAPI.Services
{
    public class UserService: IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context){
            _context = context;
        }
    }
}
