using System;
using System.Collections.Generic;
using Xunit;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project;

namespace Admin.Tests
{
    public class AdminTest
    {
        
        private readonly Mock<IAdminService> mockService = new Mock<IAdminService>();
        private AdminController testController;
        

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

            mockService.Setup(serv => serv.AddCategory(It.IsAny<Category>())).ReturnsAsync(ServiceRequest);
            testController = new AdminController(mockService.Object);

            //Act

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
            //Arrange

            var ServiceResponse = new Exception("Name is required.");

            var RequestObject = new AddCategoryRequest()
            {
                Description = "Designing and styling web pages"
            };

            mockService.Setup(serv => serv.AddCategory(It.IsAny<Category>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.AddCategory(RequestObject);
            //Assert

            var BadRequestResult = Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(BadRequestResult.Value, ServiceResponse.Message);
        }

        [Fact]
        public async Task AddCategoryTest_AlreadyExist()
        {
            //Arrange

            var RequestObject = new AddCategoryRequest()
            {
                Name = "Web styling",
                Description = "Designing and styling web pages"
            };

            var ServiceResponse = new Exception("Category with name '" + RequestObject.Name + "' already exists");

            mockService.Setup(serv => serv.AddCategory(It.IsAny<Category>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.AddCategory(RequestObject);
            //Assert

            var BadRequestResult = Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(BadRequestResult.Value, ServiceResponse.Message);
        }


        [Fact]
        public async Task GetCategoryTest()
        {
            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Category(){
                CategoryId = ServiceRequest,
                Name = "Web styling",
                Description = "Designing and styling web pages"                 
            };

            var RequestObject = new GetCategoryRequest()
            {
                Id = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = new GetCategoryResponse()
            {
                Id = ServiceRequest,
                Name = "Web styling",
                Description = "Designing and styling web pages"      
            };

            mockService.Setup(serv => serv.GetCategory(It.IsAny<Guid>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetCategory(RequestObject);
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetCategoryResponse>(okResult.Value);

            Assert.Equal(ExpectedResponseObject.Id.ToString(), returnValue.Id.ToString());
            Assert.Equal(ExpectedResponseObject.Name, returnValue.Name);
            Assert.Equal(ExpectedResponseObject.Description, returnValue.Description);
        }

        [Fact]
        public async Task GetCategoryTest_NotFound()
        {

            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Exception("Category with id '" + ServiceRequest.ToString() + "' does not exist");

            var RequestObject = new GetCategoryRequest()
            {
                Id = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = "Category with id '" + ServiceRequest.ToString() + "' does not exist";

            mockService.Setup(serv => serv.GetCategory(It.IsAny<Guid>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetCategory(RequestObject);
            //Assert

            var NotFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(NotFoundResult.Value,ExpectedResponseObject);
        }

        [Fact]
        public async Task GetCategoriesTest()
        {
        
            var ServiceResponse = new List<Category>(){
                new Category()
                    {
                        CategoryId = Guid.NewGuid(),
                        Name = "Web styling",
                        Description = "Designing and styling web pages"
                    },
                new Category()
                    {
                        CategoryId = Guid.NewGuid(),
                        Name = "Game Engine Development",
                        Description = "Designing and building game engine tools"
                    },
                new Category()
                    {
                        CategoryId = Guid.NewGuid(),
                        Name = "Socket Programming",
                        Description = "Writing a server in a specific language"
                    }
            };

            var ExpectedResponseObject = ServiceResponse.ToArray();

            mockService.Setup(serv => serv.GetCategories()).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetCategories();
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetCategoriesResponse>(okResult.Value);
            
            Assert.Equal(returnValue.category.Length,ExpectedResponseObject.Length);

            for(int count = 0; count < returnValue.category.Length; count++){
                Assert.Equal(returnValue.category[count].CategoryId.ToString(),ExpectedResponseObject[count].CategoryId.ToString());
                Assert.Equal(returnValue.category[count].Name,ExpectedResponseObject[count].Name);
                Assert.Equal(returnValue.category[count].Description,ExpectedResponseObject[count].Description);
            }
        }

        [Fact]
        public async Task GetCategoriesTest_Empty()
        {
            var ServiceResponse = new List<Category>();

            var ExpectedResponseObject = ServiceResponse.ToArray();

            mockService.Setup(serv => serv.GetCategories()).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetCategories();
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetCategoriesResponse>(okResult.Value);
            
            Assert.Equal(returnValue.category.Length,ExpectedResponseObject.Length);
        }

        [Fact]
        public async Task UpdateCategoryTest_NotFound()
        {
            //Arrange

            var ServiceRequestId = new Guid();

            var ServiceRequestCategory = new Category()
            {
                Name = "Web Styling",
                Description = "Designing and styling web pages"
            };

            var ServiceResponse = new Exception("Category with id '" + ServiceRequestId.ToString() + "' does not exist");

            var RequestObject = new UpdateCategoryRequest()
            {
                Id = ServiceRequestId.ToString(),
                Name = "Web Styling",
                Description = "Designing and styling web pages"
            };

            var ExpectedResponseObject = "Category with id '" + ServiceRequestId.ToString() + "' does not exist";

            mockService.Setup(serv => serv.UpdateCategory(It.IsAny<Guid>(),It.IsAny<Category>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.UpdateCategory(RequestObject);
            //Assert

            var NotFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(NotFoundResult.Value,ExpectedResponseObject);
        }

        [Fact]
        public async Task UpdateCategoryTest_EmptyName()
        {
            //Arrange

            var ServiceRequestId = new Guid();

            var ServiceRequestCategory = new Category()
            {
                Name = "",
                Description = "Designing and styling web pages"
            };

            var ServiceResponse = new Category()
            {
                Name = "Web Styling",
                Description = "Designing and styling web pages"
            };

            var RequestObject = new UpdateCategoryRequest()
            {
                Id = ServiceRequestId.ToString(),
                Name = "",
                Description = "Designing and styling web pages"
            };

            var ExpectedResponseObject = new UpdateCategoryResponse()
            {
                Id = ServiceRequestId,
                Name = "Web Styling",
                Description = "Designing and styling web pages" 
            };

            mockService.Setup(serv => serv.UpdateCategory(It.IsAny<Guid>(),It.IsAny<Category>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.UpdateCategory(RequestObject);
            //Assert

            var OkResult = Assert.IsType<OkObjectResult>(result);
            var resultValue = Assert.IsType<UpdateCategoryResponse>(OkResult.Value);
            
            Assert.Equal(resultValue.Id.ToString(),ExpectedResponseObject.Id.ToString());
            Assert.Equal(resultValue.Name,ExpectedResponseObject.Name);
            Assert.Equal(resultValue.Description,ExpectedResponseObject.Description);
        }

        [Fact]
        public async Task UpdateCategoryTest_EmptyDescription()
        {
            //Arrange

            var ServiceRequestId = new Guid();

            var ServiceRequestCategory = new Category()
            {
                Name = "Web Styling",
                Description = ""
            };

            var ServiceResponse = new Category()
            {
                Name = "Web Styling",
                Description = "Designing and styling web pages"
            };

            var RequestObject = new UpdateCategoryRequest()
            {
                Id = ServiceRequestId.ToString(),
                Name = "Web Styling",
                Description = ""
            };

            var ExpectedResponseObject = new UpdateCategoryResponse()
            {
                Id = ServiceRequestId,
                Name = "Web Styling",
                Description = "Designing and styling web pages" 
            };

            mockService.Setup(serv => serv.UpdateCategory(It.IsAny<Guid>(),It.IsAny<Category>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.UpdateCategory(RequestObject);
            //Assert

            var OkResult = Assert.IsType<OkObjectResult>(result);
            var resultValue = Assert.IsType<UpdateCategoryResponse>(OkResult.Value);
            
            Assert.Equal(resultValue.Id.ToString(),ExpectedResponseObject.Id.ToString());
            Assert.Equal(resultValue.Name,ExpectedResponseObject.Name);
            Assert.Equal(resultValue.Description,ExpectedResponseObject.Description);

        }

        [Fact]
        public async Task UpdateCategoryTest_EmptyNameAndDescription()
        {
            //Arrange

            var ServiceRequestId = new Guid();

            var ServiceRequestCategory = new Category()
            {
                Name = "",
                Description = ""
            };

            var ServiceResponse = new Category()
            {
                Name = "Web Styling",
                Description = "Designing and styling web pages"
            };

            var RequestObject = new UpdateCategoryRequest()
            {
                Id = ServiceRequestId.ToString(),
                Name = "",
                Description = ""
            };

            var ExpectedResponseObject = new UpdateCategoryResponse()
            {
                Id = ServiceRequestId,
                Name = "Web Styling",
                Description = "Designing and styling web pages" 
            };

            mockService.Setup(serv => serv.UpdateCategory(It.IsAny<Guid>(),It.IsAny<Category>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.UpdateCategory(RequestObject);
            //Assert

            var OkResult = Assert.IsType<OkObjectResult>(result);
            var resultValue = Assert.IsType<UpdateCategoryResponse>(OkResult.Value);
            
            Assert.Equal(resultValue.Id.ToString(),ExpectedResponseObject.Id.ToString());
            Assert.Equal(resultValue.Name,ExpectedResponseObject.Name);
            Assert.Equal(resultValue.Description,ExpectedResponseObject.Description);

        }

        [Fact]
        public async Task RemoveCategory_Found()
        {
            
            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Category(){
                CategoryId = ServiceRequest,
                Name = "Web styling",
                Description = "Designing and styling web pages"                 
            };

            var RequestObject = new RemoveCategoryRequest()
            {
                Id = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = new RemoveCategoryResponse()
            {
                Id = ServiceRequest,
                Name = "Web styling",
                Description = "Designing and styling web pages"      
            };

            mockService.Setup(serv => serv.RemoveCategory(It.IsAny<Guid>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.RemoveCategory(RequestObject);
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<RemoveCategoryResponse>(okResult.Value);

            Assert.Equal(ExpectedResponseObject.Id.ToString(), returnValue.Id.ToString());
            Assert.Equal(ExpectedResponseObject.Name, returnValue.Name);
            Assert.Equal(ExpectedResponseObject.Description, returnValue.Description);
        }
    
        [Fact]
        public async Task RemoveCategory_NotFound()
        {

            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Exception("Category with id '" + ServiceRequest.ToString() + "' does not exist");

            var RequestObject = new RemoveCategoryRequest()
            {
                Id = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = "Category with id '" + ServiceRequest.ToString() + "' does not exist";

            mockService.Setup(serv => serv.RemoveCategory(It.IsAny<Guid>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.RemoveCategory(RequestObject);
            //Assert

            var NotFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(NotFoundResult.Value,ExpectedResponseObject);
        }

        [Fact]
        public async Task AddSkillTest()
        {

            //Arrange

            var ServiceRequest = new Skill()
            {
                SkillId = Guid.NewGuid(),
                Name = "Web styling",
                CategoryId = Guid.NewGuid(),
                Status = SkillStatus.Accepted
            };

            var RequestObject = new AddSkillRequest()
            {
                Name = "Web styling",
                CategoryId = ServiceRequest.CategoryId,
            };

            var ExpectedResponseObject = new AddSkillResponse()
            {
                Added = ServiceRequest
            };

            mockService.Setup(serv => serv.AddSkill(It.IsAny<Skill>())).ReturnsAsync(ServiceRequest);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.AddSkill(RequestObject);
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<AddSkillResponse>(okResult.Value);

            Assert.Equal(ExpectedResponseObject.Added.Name, returnValue.Added.Name);
            Assert.Equal(ExpectedResponseObject.Added.CategoryId.ToString(), returnValue.Added.CategoryId.ToString());
            Assert.Equal(ExpectedResponseObject.Added.Status,returnValue.Added.Status);
        }       
    
        [Fact]
        public async Task AddSkillTest_MissingName()
        {

            //Arrange

            var ServiceRequest = new Skill()
            {
                SkillId = Guid.NewGuid(),
                Name = "Web styling",
                CategoryId = Guid.NewGuid(),
                Status = SkillStatus.Accepted
            };

            var ServiceResponse = new Exception("Name is required.");

            var RequestObject = new AddSkillRequest()
            {
                Name = "Web styling",
                CategoryId = ServiceRequest.CategoryId,
            };

            var ExpectedResponseObject = "Name is required.";

            mockService.Setup(serv => serv.AddSkill(It.IsAny<Skill>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.AddSkill(RequestObject);
            //Assert

            var BadRequestResult = Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(ExpectedResponseObject, BadRequestResult.Value);
        }

        [Fact]
        public async Task AddSkillTest_CategoryDoesNotExist()
        {

            //Arrange

            var ServiceRequest = new Skill()
            {
                SkillId = Guid.NewGuid(),
                Name = "Web styling",
                CategoryId = Guid.NewGuid(),
                Status = SkillStatus.Accepted
            };

            var ServiceResponse = new Exception("Category does not exist.");

            var RequestObject = new AddSkillRequest()
            {
                Name = "Web styling",
                CategoryId = ServiceRequest.CategoryId,
            };

            var ExpectedResponseObject = "Category does not exist.";

            mockService.Setup(serv => serv.AddSkill(It.IsAny<Skill>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.AddSkill(RequestObject);
            //Assert

            var BadRequestResult = Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(ExpectedResponseObject, BadRequestResult.Value);
        }

        [Fact]
        public async Task GetSkillTest()
        {
            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Skill(){
                SkillId = ServiceRequest,
                Name = "Web styling",
                CategoryId = Guid.NewGuid(),
                Status = SkillStatus.Accepted               
            };

            var RequestObject = new GetSkillRequest()
            {
                Id = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = new GetSkillResponse()
            {
                Id = ServiceRequest,
                Name = "Web styling",
                CategoryId = ServiceResponse.CategoryId,
                Status = SkillStatus.Accepted    
            };

            mockService.Setup(serv => serv.GetSkill(It.IsAny<Guid>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetSkill(RequestObject);
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetSkillResponse>(okResult.Value);

            Assert.Equal(ExpectedResponseObject.Id.ToString(), returnValue.Id.ToString());
            Assert.Equal(ExpectedResponseObject.Name, returnValue.Name);
            Assert.Equal(ExpectedResponseObject.CategoryId.ToString(), returnValue.CategoryId.ToString());
            Assert.Equal(ExpectedResponseObject.Status,returnValue.Status);
        }

        [Fact]
        public async Task GetSkillTest_NotFound()
        {

            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Exception("Skill with id '" + ServiceRequest.ToString() + "' does not exist");

            var RequestObject = new GetSkillRequest()
            {
                Id = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = "Skill with id '" + ServiceRequest.ToString() + "' does not exist";

            mockService.Setup(serv => serv.GetSkill(It.IsAny<Guid>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetSkill(RequestObject);
            //Assert

            var NotFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(NotFoundResult.Value,ExpectedResponseObject);

        }

        [Fact]
        public async Task GetSkillsTest()
        {
            var ServiceResponse = new List<Skill>(){
                new Skill()
                    {
                        SkillId = Guid.NewGuid(),
                        Name = "Web styling",
                        CategoryId = Guid.NewGuid(),
                        Status = SkillStatus.Accepted
                    },
                new Skill()
                    {
                        SkillId = Guid.NewGuid(),
                        Name = "Game Engine Development",
                        CategoryId = Guid.NewGuid(),
                        Status = SkillStatus.Accepted
                    },
                new Skill()
                    {
                        SkillId = Guid.NewGuid(),
                        Name = "Socket Programming",
                        CategoryId = Guid.NewGuid(),
                        Status = SkillStatus.Accepted
                    }
            };

            var ExpectedResponseObject = ServiceResponse.ToArray();

            mockService.Setup(serv => serv.GetSkills()).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetSkills();
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetSkillsResponse>(okResult.Value);
            
            Assert.Equal(returnValue.skills.Length,ExpectedResponseObject.Length);

            for(int count = 0; count < returnValue.skills.Length; count++){
                Assert.Equal(returnValue.skills[count].SkillId.ToString(),ExpectedResponseObject[count].SkillId.ToString());
                Assert.Equal(returnValue.skills[count].Name,ExpectedResponseObject[count].Name);
                Assert.Equal(returnValue.skills[count].Status,ExpectedResponseObject[count].Status);
                Assert.Equal(returnValue.skills[count].CategoryId.ToString(),ExpectedResponseObject[count].CategoryId.ToString());
            }
        }               

        [Fact]
        public async Task GetSkillsTest_Empty()
        {

            var ServiceResponse = new List<Skill>();

            var ExpectedResponseObject = ServiceResponse.ToArray();

            mockService.Setup(serv => serv.GetSkills()).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetSkills();
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetSkillsResponse>(okResult.Value);
            
            Assert.Equal(returnValue.skills.Length,ExpectedResponseObject.Length);
        }

        [Fact]
        public async Task UpdateSkillTest_NotFound()
        {

            //Arrange

            var ServiceRequestId = new Guid();

            var ServiceRequestSkill = new Skill()
            {
                Name = "Web Styling",
                CategoryId = Guid.NewGuid(),
                Status = SkillStatus.Accepted
            };

            var ServiceResponse = new Exception("Skill with id '" + ServiceRequestId.ToString() + "' does not exist");

            var RequestObject = new UpdateSkillRequest()
            {
                Id = ServiceRequestId.ToString(),
                Name = "Web Styling",
                CategoryId = ServiceRequestSkill.CategoryId.ToString(),
                Status = SkillStatus.Accepted
            };

            var ExpectedResponseObject = "Skill with id '" + ServiceRequestId.ToString() + "' does not exist";

            mockService.Setup(serv => serv.UpdateSkill(It.IsAny<Guid>(),It.IsAny<Skill>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.UpdateSkill(RequestObject);
            //Assert

            var NotFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(NotFoundResult.Value,ExpectedResponseObject);
        }

        [Fact]
        public async Task UpdateSkillTest_MissingName()
        {

            //Arrange

            var ServiceRequestId = new Guid();

            var ServiceRequestSkill = new Skill()
            {
                Name = "",
                CategoryId = Guid.NewGuid(),
                Status = SkillStatus.Accepted
            };

            var ServiceResponse = new Skill()
            {
                Name = "Web Styling",
                CategoryId = ServiceRequestSkill.CategoryId,
                Status = SkillStatus.Accepted
            };

            var RequestObject = new UpdateSkillRequest()
            {
                Id = ServiceRequestId.ToString(),
                Name = "",
                CategoryId = ServiceRequestSkill.CategoryId.ToString(),
                Status = SkillStatus.Accepted
            };

            var ExpectedResponseObject = new UpdateSkillResponse()
            {
                Id = ServiceRequestId,
                Name = "Web Styling",
                CategoryId = ServiceRequestSkill.CategoryId,
                Status = SkillStatus.Accepted 
            };

            mockService.Setup(serv => serv.UpdateSkill(It.IsAny<Guid>(),It.IsAny<Skill>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.UpdateSkill(RequestObject);
            //Assert

            var OkResult = Assert.IsType<OkObjectResult>(result);
            var resultValue = Assert.IsType<UpdateSkillResponse>(OkResult.Value);
            
            Assert.Equal(resultValue.Id.ToString(),ExpectedResponseObject.Id.ToString());
            Assert.Equal(resultValue.Name,ExpectedResponseObject.Name);
            Assert.Equal(resultValue.CategoryId.ToString(),ExpectedResponseObject.CategoryId.ToString());
            Assert.Equal(resultValue.Status,ExpectedResponseObject.Status);
        }

        [Fact]
        public async Task RemoveSkillTest()
        {
 
            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Skill(){
                SkillId = ServiceRequest,
                Name = "Web styling",
                CategoryId = Guid.NewGuid(),
                Status = SkillStatus.Accepted               
            };

            var RequestObject = new RemoveSkillRequest()
            {
                SkillId = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = new RemoveSkillResponse()
            {
                Success = true,
                Removed = ServiceResponse      
            };

            mockService.Setup(serv => serv.RemoveSkill(It.IsAny<Guid>())).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.RemoveSkill(RequestObject);
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<RemoveSkillResponse>(okResult.Value);

            Assert.Equal(ExpectedResponseObject.Removed.SkillId.ToString(), returnValue.Removed.SkillId.ToString());
            Assert.Equal(ExpectedResponseObject.Removed.Name, returnValue.Removed.Name);
            Assert.Equal(ExpectedResponseObject.Removed.CategoryId.ToString(), returnValue.Removed.CategoryId.ToString());
            Assert.Equal(ExpectedResponseObject.Removed.Status,returnValue.Removed.Status);
        }          
    
        [Fact]
        public async Task RemoveSkillTest_NotFound()
        {


            //Arrange

            var ServiceRequest = new Guid();

            var ServiceResponse = new Exception("Skill with id '" + ServiceRequest.ToString() + "' does not exist");

            var RequestObject = new RemoveSkillRequest()
            {
                SkillId = ServiceRequest.ToString()
            };

            var ExpectedResponseObject = "Skill with id '" + ServiceRequest.ToString() + "' does not exist";

            mockService.Setup(serv => serv.RemoveSkill(It.IsAny<Guid>())).ThrowsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.RemoveSkill(RequestObject);
            //Assert

            var NotFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(NotFoundResult.Value,ExpectedResponseObject);
        } 

        [Fact]
        public async Task GetSkillCollections()
        {

        
            var ServiceResponse = new List<ProjectSkillCollection>(){
                new ProjectSkillCollection()
                    {
                        ProjectSkillCollectionId = Guid.NewGuid(),
                        Name = "Web styling",
                        Description = "Designing and styling web pages",
                        Weight = 5,
                        ProjectId = Guid.NewGuid()
                    },
                new ProjectSkillCollection()
                    {
                        ProjectSkillCollectionId = Guid.NewGuid(),
                        Name = "Game Engine Development",
                        Description = "Designing and building game engine tools",
                        Weight = 7,
                        ProjectId = Guid.NewGuid()
                    },
                new ProjectSkillCollection()
                    {
                        ProjectSkillCollectionId = Guid.NewGuid(),
                        Name = "Socket Programming",
                        Description = "Writing a server in a specific language",
                        Weight = 8,
                        ProjectId = Guid.NewGuid()
                    }
            };

            var ExpectedResponseObject = ServiceResponse.ToArray();

            mockService.Setup(serv => serv.GetSkillCollections()).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetSkillCollections();
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetSkillCollectionsResponse>(okResult.Value);
            
            Assert.Equal(returnValue.collections.Length,ExpectedResponseObject.Length);

            for(int count = 0; count < returnValue.collections.Length; count++){
                Assert.Equal(returnValue.collections[count].ProjectSkillCollectionId.ToString(),ExpectedResponseObject[count].ProjectSkillCollectionId.ToString());
                Assert.Equal(returnValue.collections[count].Name,ExpectedResponseObject[count].Name);
                Assert.Equal(returnValue.collections[count].Description,ExpectedResponseObject[count].Description);
                Assert.Equal(returnValue.collections[count].Weight,ExpectedResponseObject[count].Weight);
                Assert.Equal(returnValue.collections[count].ProjectId.ToString(),ExpectedResponseObject[count].ProjectId.ToString());
            }
        }

        [Fact]
        public async Task GetSkillCollections_Empty()
        {

        
            var ServiceResponse = new List<ProjectSkillCollection>(){
                
            };

            var ExpectedResponseObject = ServiceResponse.ToArray();

            mockService.Setup(serv => serv.GetSkillCollections()).ReturnsAsync(ServiceResponse);
            testController = new AdminController(mockService.Object);

            //Act

            var result = await testController.GetSkillCollections();
            //Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<GetSkillCollectionsResponse>(okResult.Value);
            
            Assert.Equal(returnValue.collections.Length,ExpectedResponseObject.Length);
        }     
    }
}
