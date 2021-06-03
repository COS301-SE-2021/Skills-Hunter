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
            //Arrange

            var proj1 = new Project
            {
                ProjectId = 1,
                Name = "Data 1",
                Description = "We are data",
                Industry = "Data",
                Owner = "Tim Brown",
                Location = "Pretoria Callies",
                Skills = "Analysis,Excel,Word",
                OpenForApplication = true
            };

            A.CallTo(() => _projectRepo.CreateProject(proj1)).Returns(proj1);
            var createdResponse1 = _controller.CreateProject(proj1);
            //var item1 = createdResponse1.Result.Value as Project;

            var proj2 = new Project
            {
                ProjectId = 2,
                Name = "Data 2",
                Description = "We are data",
                Industry = "Data",
                Owner = "Tim Brown",
                Location = "Pretoria Callies",
                Skills = "Analysis,Excel,Word",
                OpenForApplication = true
            };

            //A.CallTo(() => _projectRepo.CreateProject(proj2)).Returns(proj2);
            var createdResponse2 = _controller.CreateProject(proj2);
            //var item2 = createdResponse2.Result.Value as Project;

            var proj3 = new Project
            {
                ProjectId = 3,
                Name = "Data 3",
                Description = "We are data",
                Industry = "Data",
                Owner = "Tim Brown",
                Location = "Pretoria Callies",
                Skills = "Analysis,Excel,Word",
                OpenForApplication = true
            };

            //A.CallTo(() => _projectRepo.CreateProject(proj3)).Returns(proj3);
            var createdResponse3 = _controller.CreateProject(proj3);
            //var item3 = createdResponse3.Result.Value as Project;

            //Act

            var actionResult = _controller.DeleteProject(2);

            //Assert
            Assert.Equal(2, _controller.GetProjects().Result.ToList().Count);

        }
    }
}
