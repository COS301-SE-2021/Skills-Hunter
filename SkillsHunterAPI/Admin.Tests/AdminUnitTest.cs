using System;
using Xunit;
//using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.Skill;
using FakeItEasy;

namespace SkillsHunterAdminUnitTest
{
    public class AdminUnitTest
    {
        
        private readonly IAdminService mockService = A.Fake<IAdminService>();
        private AdminController testController;
        
        public AdminUnitTest(){

        }

        [Fact]
        public async Task AddCategoryTest()
        {
            //Arrange

            var ServiceRequest = new Category()
            {
                CategoryId = Guid.NewGuid(),
                Name = "Web styling",
                Description = "Designing and styling web pages"
            };

            var RequestObject = new AddCategoryRequest()
            {
                Name = "Web styling",
                Description = "Designing and styling web pages"
            };

            var ExpectedResponseObject = new AddCategoryResponse()
            {
                Added = ServiceRequest
            };

            //Act

            //mockService.Setup(serv => serv.AddCategory(It.IsAny<Category>())).ReturnsAsync(ServiceRequest);
            //testController = new AdminController(mockService.Object);

            var result = await testController.AddCategory(RequestObject);
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<AddCategoryResponse>(okResult.Value);

            Assert.Equal(ExpectedResponseObject.Added.Name, returnValue.Added.Name);
            Assert.Equal(ExpectedResponseObject.Added.Description, returnValue.Added.Description);
        }

        [Fact]
        public async Task AddCategoryTest_MissingName()
        {

        }

        [Fact]
        public async Task GetCategoryTest()
        {

        }

        [Fact]
        public async Task GetCategoryTest_NotFound()
        {

        }

        [Fact]
        public async Task GetCategoriesTest()
        {

        }

        [Fact]
        public async Task GetCategoriesTest_Empty()
        {

        }

        [Fact]
        public async Task UpdateCategoryTest_NotFound()
        {

        }

        [Fact]
        public async Task UpdateCategoryTest_EmptyName()
        {

        }

        [Fact]
        public async Task UpdateCategoryTest_EmptyDescription()
        {

        }

        [Fact]
        public async Task UpdateCategoryTest_EmptyNameAndDescription()
        {

        }

        [Fact]
        public async Task RemoveCategory_Found()
        {

        }
    
        [Fact]
        public async Task RemoveCategory_NotFound()
        {

        }

        [Fact]
        public async Task AddSkillTest()
        {

        }       
    
        [Fact]
        public async Task AddSkillTest_MissingName()
        {

        }

        [Fact]
        public async Task AddSkillTest_CategoryDoesNotExist()
        {

        }

        [Fact]
        public async Task GetSkillTest()
        {

        }

        [Fact]
        public async Task GetSkillTest_NotFound()
        {

        }

        [Fact]
        public async Task GetSkillsTest()
        {

        }               

        [Fact]
        public async Task GetSkillsTest_Empty()
        {

        }

        [Fact]
        public async Task UpdateSkillTest_NotFound()
        {

        }

        [Fact]
        public async Task UpdateSkillTest_MissingName()
        {

        }

        [Fact]
        public async Task UpdateSkillTest_CategoryDoesNotExist()
        {

        }

        [Fact]
        public async Task UpdateSkillTest_ChangeSkillStatus()
        {

        }

        [Fact]
        public async Task RemoveSkillTest()
        {

        }          
    
        [Fact]
        public async Task RemoveSkillTest_NotFound()
        {

        } 

        [Fact]
        public async Task GetSkillCollections()
        {

        }

        [Fact]
        public async Task GetSkillCollections_Empty()
        {

        }     
    }
}
