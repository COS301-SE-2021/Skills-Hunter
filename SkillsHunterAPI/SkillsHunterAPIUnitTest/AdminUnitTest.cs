using System;
using Moq;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Services;
using Xunit;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class AdminUnitTest
    {

        private readonly Mock<IAdminService> mockService = new Mock<IAdminService>();
        private readonly AdminController testController;
        //private readonly IMediator _mediator;

        public AdminUnitTest()
        {
            //testController = new AdminController(mockService.Object);
        }

        [Fact]
        public async Task testAddCategory()
        {
            // Arrange

            AddCategoryCommand request = new AddCategoryCommand()
            {
                Name = "Web styling",
                Description = "Designing and styling web pages"
            };

            Category serviceRequest  = new Category()
            {
                Name = "Web styling",
                Description = "Designing and styling web pages"
            };

            AddCategoryResponse response = new AddCategoryResponse()
            {
                Added = serviceRequest
            };

            mockService.Setup(serv => serv.AddCategory(serviceRequest)).ReturnsAsync(serviceRequest);

            // Act
            
            var result = await testController.AddCategory(request);

            // Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<AddCategoryResponse>(okResult.Value);
            Assert.Equal(request.Name, returnValue.Added.Name);
            Assert.Equal(request.Description,returnValue.Added.Description);
        
        }



        [Fact]
        public async Task testAddSkill()
        {
            // Arrange
            Guid CatId = Guid.NewGuid();

            AddSkillCommand request = new AddSkillCommand()
            {
                Name = "Java Web Development",
            };

            Skill serviceRequest  = new Skill()
            {
                Name = "Java Web Development",
                //CategoryId = CatId
            };

            AddSkillResponse response = new AddSkillResponse()
            {
                Added = serviceRequest
            };

            mockService.Setup(serv => serv.CreateSkill(serviceRequest)).ReturnsAsync(serviceRequest);

            // Act
            
            var result = await testController.CreateSkill(request);

            // Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<AddSkillResponse>(okResult.Value);
            Assert.Equal(request.Name, returnValue.Added.Name);
            //Assert.Equal(request.CategoryId, returnValue.Added.CategoryId);
        }


        [Fact]
        public async Task testRemoveCategory()
        {
            // Arrange
            Guid CatId = Guid.NewGuid();

            RemoveCategoryRequest request = new RemoveCategoryRequest()
            {
                CategoryId = CatId
            };

            Category serviceResponse  = new Category()
            {
                CategoryId = CatId,
                Name = "Web styling",
                Description = "Designing and styling web pages"
            };

            RemoveCategoryResponse response = new RemoveCategoryResponse()
            {
                Id = CatId,
                Name = "Web styling",
                Description = "Designing and styling web pages"
            };

            mockService.Setup(serv => serv.RemoveCategory(CatId)).ReturnsAsync(serviceResponse);

            // Act
            
            var result = await testController.RemoveCategory(request);

            // Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<RemoveCategoryResponse>(okResult.Value);
            Assert.Equal(request.CategoryId,returnValue.Id);          
        }

        [Fact]
        public async Task testRemoveSkill()
        {
            // Arrange
            Guid SkId = Guid.NewGuid();
            Guid CatId = Guid.NewGuid();

            RemoveSkillRequest request = new RemoveSkillRequest()
            {
                SkillId = SkId
            };

            Skill serviceResponse  = new Skill()
            {
                SkillId = SkId,
                Name = "Java Web Development",
                //CategoryId = CatId,
                Status = SkillStatus.Accepted
            };

            RemoveSkillResponse response = new RemoveSkillResponse()
            {
                Success = true,
                Removed = serviceResponse
            };

            mockService.Setup(serv => serv.RemoveSkill(CatId)).ReturnsAsync(serviceResponse);

            // Act
            
            var result = await testController.RemoveSkill(request);

            // Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<RemoveSkillResponse>(okResult.Value);
            Assert.Equal(request.SkillId.ToString(),returnValue.Removed.SkillId.ToString());
        }

    }
}
