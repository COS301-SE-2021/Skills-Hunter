using System;
using Moq;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Services;
using Xunit;
using System.Threading.Tasks;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class AdminUnitTest
    {

        private readonly Mock<IAdminService> mockService = new Mock<IAdminService>();
        private readonly AdminController testController;

        public AdminUnitTest()
        {
            testController = new AdminController(mockService.Object);
        }

        [Fact]
        public void testAddCategory()
        {
            //mockService.Setup().Returns();
        }



        [Fact]
        public void testAddSkill()
        {

        }



        [Fact]
        public void testRemoveSkill()
        {

        }

    }
}
