using System;
using FakeItEasy;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Repositories;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class SkillsHunterAPIUnitTestBase
    {
        public IProjectRepository projectRepository;
        public ProjectController projectController;

        public SkillsHunterAPIUnitTestBase()
        {
         
            projectRepository = A.Fake<IProjectRepository>();
            projectController = new ProjectController(projectRepository);
        }
    }
}
