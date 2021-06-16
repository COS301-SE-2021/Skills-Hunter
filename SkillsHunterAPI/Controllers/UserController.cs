using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
    }
}
