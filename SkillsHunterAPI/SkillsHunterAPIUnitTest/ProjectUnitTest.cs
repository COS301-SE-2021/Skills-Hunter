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
        public void testGetProjectByID()    //testing the function that retrieves only one project
        {
            // Arrange
            var testId = 2;
            var proj1 = new Project
            {
                ProjectId = 2,
                Name = "Data Governance",
                Description = "We do data governance",
                Industry = "Data",
                Owner = "Tim Dash",
                Location = "Pretoria",
                Skills = "Analysis,Excel,Word",
                OpenForApplication = true
            };


            // Act
            A.CallTo(() => _projectRepo.GetProject(testId)).Returns((proj1));
            var actionResult = _controller.GetProject(testId).Result;


            // Assert
            Assert.IsType<Project>(actionResult.Value);
            Assert.Equal(testId, (actionResult.Value as Project).ProjectId);

        }

        [Fact]
        public void testCreateProject() //Testing the creation of projects
        {
            // Arrange
            var proj1 = new Project
            {
                ProjectId = 4,
                Name = "Data",
                Description = "We are data",
                Industry = "Data",
                Owner = "Tim Brown",
                Location = "Pretoria Callies",
                Skills = "Analysis,Excel,Word",
                OpenForApplication = true
            };


            // Act
            A.CallTo(() => _projectRepo.CreateProject(proj1)).Returns(proj1);
            var createdResponse = _controller.CreateProject(proj1);
            var item = createdResponse.Result.Value as Project;


            // Assert
            Assert.IsType<Project>(item);
            Assert.Equal("Data", (item.Name));

        }

        [Fact]
        public async Task testGetProjects()    //testing the function that retrieves projects from the database
        {
            //Arrange

            var count = 6;
            var fakeProjects = A.CollectionOfFake<Project>(count);
            A.CallTo(() => _projectRepo.GetProjects()).Returns((fakeProjects));

            //Act

            var IEnumerable = await _controller.GetProjects();

            //Assert

            var result = IEnumerable.ToList();
            var returnProjects = result.Count();
            Assert.Equal(count, returnProjects);

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


            //A.CallTo(() => _projectRepo.CreateProject(proj3)).Returns(proj3);
            var createdResponse3 = _controller.CreateProject(proj1);
            //var item3 = createdResponse3.Result.Value as Project;

            //Act

            var actionResult = _controller.DeleteProject(1);

            //Assert
            Assert.Empty(_controller.GetProjects().Result.ToList());

        }
    }
}