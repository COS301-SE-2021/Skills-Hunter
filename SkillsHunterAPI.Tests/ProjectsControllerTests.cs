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
            
        }


        [Fact]
        public void DeleteProjectsById()
        {
           
        }


        [Fact]
        public void GetProjectById_ExistingIDPassed_ReturnsRightItem()
        {
        
        }


        [Fact]
        public void CreateProject_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            // Arrange
      
        }


    }
}
