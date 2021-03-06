using System;
using FakeItEasy;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class SkillsHunterAPIUnitTestBase
    {
        public IProjectService projectService;
        public ISkillService skillService;
        public ProjectController projectController;
        public UserController userController;

        public SkillsHunterAPIUnitTestBase()
        {

            projectService = A.Fake<IProjectService>();
            skillService = A.Fake<ISkillService>();
            userController = A.Fake<UserController>();
            projectController = new ProjectController(projectService, skillService, userController);
        }
    }
}
