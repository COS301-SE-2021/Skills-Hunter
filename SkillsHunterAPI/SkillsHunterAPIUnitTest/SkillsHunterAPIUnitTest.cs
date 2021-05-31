using System;
using FakeItEasy;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Repositories;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class SkillsHunterAPIUnitTest
    {
        public ProjectRepository projectRepository;
        public ProjectController projectController;

        public SkillsHunterAPIUnitTest()
        {
            var dataStore = A.Fake<ApplicationContextDB>();
            projectRepository = new ProjectRepository(dataStore);
            projectController = new ProjectController(projectRepository);
        }
    }
}
