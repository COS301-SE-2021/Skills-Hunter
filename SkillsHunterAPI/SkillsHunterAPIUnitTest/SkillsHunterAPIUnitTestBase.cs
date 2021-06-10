using System;
using FakeItEasy;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Services;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class SkillsHunterAPIUnitTestBase
    {
        public IProjectService projectRepository;
        public ProjectController projectController;

        public SkillsHunterAPIUnitTestBase()
        {
         
            projectRepository = A.Fake<IProjectService>();
            projectController = new ProjectController(projectRepository);
        }
    }
}
