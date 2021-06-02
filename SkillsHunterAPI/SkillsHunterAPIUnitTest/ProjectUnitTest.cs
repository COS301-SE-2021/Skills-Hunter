using System;
using Xunit;
using SkillsHunterAPI.Models;
using System.Collections.Generic;
using FakeItEasy;
using System.Threading.Tasks;
using System.Linq;
using SkillsHunterAPI.Repositories;
using SkillsHunterAPI.Controllers;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class ProjectUnitTest
    {
        //TESTING ONLY THE PROJECT SUBSYSTEM

        IProjectRepository _projectRepo;
        ProjectController _controller;

        public ProjectUnitTest()
        {
            _projectRepo = A.Fake<IProjectRepository>();
            _controller = new ProjectController(_projectRepo);
        }



        [Fact]
        public void testGetProject()    //testing the function that retrieves only one project
        {
            //var testController = new 
        }

        [Fact]
        public void testCreateProject() //Testing the creation of projects
        {
            
        }

        [Fact]
        public async Task testGetProjects()    //testing the function that retrieves projects from the database
        {
           
        }

        [Fact]
        public void testUpdateProject()    //testing the function that updates only one project
        {
            //var testController = new 
        }

        [Fact]
        public void testDeleteProject()    //testing the function that deletes only one project
        {

        }
    }
}
