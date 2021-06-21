using System;
using FakeItEasy;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Services;
using Xunit;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class AdminUnitTest
    {
        IAdminService _adminService;
        AdminController _controller;

        public AdminUnitTest()
        {
            _adminService = A.Fake<IAdminService>();
            _controller = A.Fake<AdminController>();
        }

        [Fact]
        public void testAddCategory()
        {
            var cat1 = new Category
            {
                Name = "Web dev",
                //CategoryId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6")
            };

            var addCategoryRequest = new AddCategoryRequest
            {
                Name = "Web dev",
                //CategoryId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6")
            };


            // Act
            A.CallTo(() => _adminService.AddCategory(cat1)).Returns(cat1); // _projectService.CreateProject(p.Returns(proj1);
            var createdResponse = _controller.AddCategory(addCategoryRequest);
            var item = createdResponse.Result as AddCategoryResponse;

            // Assert
            Assert.IsType<AddCategoryResponse>(item);
            Assert.True(item.Success);
        }



        [Fact]
        public void testAddSkill()
        {
            var skill1 = new Skill
            {
                Name = "C++",
                CategoryId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6")
            };

            var AddSkillRequest = new AddSkillRequest
            {
                Name = "C++",
                CategoryId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6")
            };


            // Act
            A.CallTo(() => _adminService.AddSkill(skill1)).Returns(skill1); // _projectService.CreateProject(p.Returns(proj1);
            var createdResponse = _controller.AddSkill(AddSkillRequest);
            var item = createdResponse.Result as AddSkillResponse;

            // Assert
            Assert.IsType<AddSkillResponse>(item);
            Assert.True(item.Success);
        }



        [Fact]
        public void testRemoveSkill()
        {
            var removeSkillRequest = new RemoveSkillRequest
            {
                SkillId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6")
            };

            // Act
            A.CallTo(() => _adminService.RemoveSkill(removeSkillRequest.SkillId)); // _projectService.CreateProject(p.Returns(proj1);
            var createdResponse = _controller.RemoveSkill(removeSkillRequest.SkillId);
            var item = createdResponse.Result as RemoveSkillResponse;

            // Assert
            Assert.IsType<RemoveSkillResponse>(item);
            Assert.True(item.Success);
        }

    }
}
