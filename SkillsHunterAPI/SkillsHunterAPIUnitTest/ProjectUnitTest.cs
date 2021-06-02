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

        IProjectRepository projectRepository;
        ProjectController projectController;

        public ProjectUnitTest()
        {
            projectRepository = A.Fake<IProjectRepository>();
            projectController = new ProjectController(projectRepository);
        }



        [Fact]
        public void testGetProject()    //testing the function that retrieves only one project
        {
            //var testController = new 
        }

        [Fact]
        public void testCreateProject() //Testing the creation of projects
        {
            Project project = new Project();
            project.Description = "Web development";
            project.Location = "Hatfield";
            project.Name = "Skills Hunter";
            project.Owner = "Mxolisi";
            project.Skills = "HTML,CSS";
            project.OpenForApplication = true;
            project.Industry = "CS";

            var actionResults = projectController.CreateProject(project);

            var results = actionResults.Result;
            var resultProject = results.Value as Project;

            Assert.Equal(project, resultProject);
        }

        [Fact]
        public async Task testGetProjects()    //testing the function that retrieves projects from the database
        {
            //var testController = new
            var count = 6;
            var fakeProjects = A.CollectionOfFake<Project>(count);
            A.CallTo(() => projectRepository.GetProjects()).Returns((fakeProjects));

            //Act

            var IEnumerable = await projectController.GetProjects();

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
            //var testController = new 
        }
    }
}
