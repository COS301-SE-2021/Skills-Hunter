using System;
using FakeItEasy;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Services;
using Xunit;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class AdminUnitTest
    {
        IAdminService _adminService;
        AdminController _controller;

        public AdminUnitTest()
        {
            _adminService = A.Fake<IAdminService>();
            _controller = A.Fake<AdminController>();
        }
    }
}
