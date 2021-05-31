using System;
using Xunit;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Repositories;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class ProjectUnitTest: SkillsHunterAPIUnitTest
    {
        //TESTING ONLY THE PROJECT SUBSYSTEM
        public ProjectUnitTest() : base()
        {

        }



        [Fact]
        public void TestGetProject()    //testing the function that retrieves only one project
        {
            //var testController = new 
        }

        [Fact]
        public void TestCreateProject() //Testing the creation of projects
        {

            var testProjectController = new ProjectController(projectRepository);
        }
    }
}
