using System;
using Xunit;
using SkillsHunterAPI.Models;
using System.Collections.Generic;

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
        public void TestGetProjects()    //testing the function that retrieves projects from the database
        {
            //var testController = new 
        }

        [Fact]
        public void TestUpdateProject()    //testing the function that updates only one project
        {
            //var testController = new 
        }

        [Fact]
        public void TestDeleteProject()    //testing the function that deletes only one project
        {
            //var testController = new 
        }
    }
}
