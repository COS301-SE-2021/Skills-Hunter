using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace SkillsHunterAPI.Tests
{
    public class ProjectsControllerTests
    {

        ProjectsController _controller;
        IProjectRepository _projectRepo;

        public ProjectsControllerTests()
        {
            _projectRepo = A.Fake<IProjectRepository>();
            _controller = new ProjectsController(_projectRepo);
        }

        [Fact]
        public async Task GetProjects_AllReturned()
        {
            //Arrange

            var count = 6;
            var fakeProjects = A.CollectionOfFake<Project>(count);
            A.CallTo(() => _projectRepo.GetProjects()).Returns((fakeProjects));

            _controller = new ProjectsController(_projectRepo);

            //Act

            var IEnumerable = await _controller.GetProjects();

            //Assert

            var result = IEnumerable.ToList();
            var returnProjects = result.Count();
            Assert.Equal(count, returnProjects);

        }


        [Fact]
        public void DeleteProjectsById()
        {
           
        }


        [Fact]
        public void GetProjectById_ExistingIDPassed_ReturnsRightItem()
        {
            // Arrange
            var testId = 2;
            var proj1 = new Project
            {
                Id = 2,
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
            Assert.Equal(testId, (actionResult.Value as Project).Id);
        }


        [Fact]
        public void CreateProject_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            // Arrange
      
        }


    }
}
