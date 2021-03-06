
using System;
using Xunit;
using System.Collections.Generic;
using FakeItEasy;
using System.Threading.Tasks;
using System.Linq;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Skill;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class ProjectUnitTest
    {
        //TESTING ONLY THE PROJECT SUBSYSTEM

        IProjectService _projectService;
        ISkillService _skillService;
        ProjectController _controller;

        public ProjectUnitTest()
        {
            _projectService = A.Fake<IProjectService>();
            _controller = A.Fake<ProjectController>(); //new ProjectController(_projectService, _skillService);
        }


        

        /*[Fact]
        public void testAddSkill()
        {
            var skill1 = new Skill
            {
                Name = "C++"
                //CategoryId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6")
            };


            // Act
            A.CallTo(() => _skillService.AddSkill("C++")); // _projectService.CreateProject(p.Returns(proj1);
            var createdResponse = _controller.CreateProject(proj1);
            var item = createdResponse.Result.Value as Project;

            // Assert
            Assert.IsType<Project>(actionResult.Value);
            Assert.Equal(testId, (actionResult.Value as Project).ProjectId);

        }



         [Fact]
         public void testGetProjectByID()    //testing the function that retrieves only one project
         {
             // Arrange
             var testId = 2;
             var proj1 = new Project
             {
                 //ProjectId = 2,
                 Name = "Data Governance",
                 Description = "We do data governance",

                 Location = "Pretoria",
                 Skills = "Analysis,Excel,Word",
                 OpenForApplication = true
             };


             // Act
             A.CallTo(() => _projectService.GetProject(testId)).Returns((proj1));
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
        public void testUpdateProject()    //testing the function that updates only one project
        {
            //var testController = new 
            // Arrange
            var ProjectIdToBeUpdated = 1;
            var proj1 = new Project
            {
                ProjectId = 1,
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
            var existingProject = _controller.GetProject(ProjectIdToBeUpdated);
            var Result = existingProject.Result.Value;

            var proj = new Project
            {
                ProjectId = Result.ProjectId,
                Name = Result.Name,
                Description = "This is new description",
                Industry = Result.Industry,
                Owner = Result.Owner,
                Location = Result.Location,
                Skills = Result.Skills,
                OpenForApplication = Result.OpenForApplication

        };
      


            // A.CallTo(() => _projectRepo.CreateProject(proj1)).Returns(proj1);
            var updateData = _controller.UpdateProject(ProjectIdToBeUpdated, proj);

    


            // Assert
            //Assert.IsType<Project>(updateData);
      
        }

        [Fact]
        public void testDeleteProject()    //testing the function that deletes only one project
        {
            //Arrange

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
             // Arrange
             var ProjectIdToBeUpdated = 1;
             var proj1 = new Project
             {
                 ProjectId = 1,
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
             var existingProject = _controller.GetProject(ProjectIdToBeUpdated);
             var Result = existingProject.Result.Value;

             var proj = new Project
             {
                 ProjectId = Result.ProjectId,
                 Name = Result.Name,
                 Description = "This is new description",
                 Industry = Result.Industry,
                 Owner = Result.Owner,
                 Location = Result.Location,
                 Skills = Result.Skills,
                 OpenForApplication = Result.OpenForApplication

         };



             // A.CallTo(() => _projectRepo.CreateProject(proj1)).Returns(proj1);
             var updateData = _controller.UpdateProject(ProjectIdToBeUpdated, proj);




             // Assert
             //Assert.IsType<Project>(updateData);

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

         }*/
    }
}
