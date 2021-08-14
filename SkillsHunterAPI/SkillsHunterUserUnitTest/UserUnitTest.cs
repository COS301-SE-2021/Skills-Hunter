using System;
using System.Threading.Tasks;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models.User;
using SkillsHunterAPI.Services;
using Xunit;

namespace SkillsHunterUserUnitTest
{
    public class UserUnitTest
    {
        private readonly IUserService userService = A.Fake<IUserService>();
        private UserController userController;

        [Fact]
        public async Task TestRegister()
        {
            //Arrange
            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.Name = "James";
            registerRequest.Surname = "Smith";
            registerRequest.Phone = "0792352726";
            registerRequest.Role = 0;
            registerRequest.Email = "JS@gmail.com";
            registerRequest.OpenForWork = true;
            registerRequest.Password = "James2431";

            // Act
            var actionResult = await userController.Register(registerRequest);

            // Assert
            Assert.IsType<OkObjectResult>(actionResult);
        }

        [Fact]
        public async Task TestAuthenticate()
        {
            //Arrange
            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.Name = "James";
            registerRequest.Surname = "Smith";
            registerRequest.Phone = "0792352726";
            registerRequest.Role = 0;
            registerRequest.Email = "JS@gmail.com";
            registerRequest.OpenForWork = true;
            registerRequest.Password = "James2431";

            var registerResult = userController.Register(registerRequest);

            AuthenticateRequest authenticateRequest = new AuthenticateRequest();
            authenticateRequest.Email = registerRequest.Email;
            authenticateRequest.Password = registerRequest.Password;

            AuthenticateResponse authenticateResponse = new AuthenticateResponse();
            authenticateResponse.Name = registerRequest.Name;
            authenticateResponse.Role = registerRequest.Role;
            authenticateResponse.Surname = registerRequest.Surname;

            //Act
            var result = await userController.Authenticate(authenticateRequest);

            //Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<AuthenticateResponse>(okResult.Value);
            Assert.Equal(registerRequest.Name, returnValue.Name);
            Assert.Equal(registerRequest.Surname, returnValue.Surname);
            Assert.Equal(registerRequest.Role, returnValue.Role);

        }

        [Fact]
        public async Task TestGetCurrentUserId()
        {
            //Arrange
            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.Name = "James";
            registerRequest.Surname = "Smith";
            registerRequest.Phone = "0792352726";
            registerRequest.Role = 0;
            registerRequest.Email = "JS@gmail.com";
            registerRequest.OpenForWork = true;
            registerRequest.Password = "James2431";


            var registerResult = userController.Register(registerRequest);

            AuthenticateRequest authenticateRequest = new AuthenticateRequest();
            authenticateRequest.Email = registerRequest.Email;
            authenticateRequest.Password = registerRequest.Password;

            var LoginResult = await userController.Authenticate(authenticateRequest);
            OkObjectResult LoginOkResult = (OkObjectResult)LoginResult;
            AuthenticateResponse authenticateResponse = (AuthenticateResponse)LoginOkResult.Value;

            //Act

            Guid userId = userController.GetCurrentUserId();

            Assert.Equal(userId, authenticateResponse.UserId);

        }

        [Fact]
        public void TestLogout()
        {

        }

        [Fact]
        public void TestUpdateUser()
        {

        }

        [Fact]
        public void TestDeleteUser()
        {

        }

        [Fact]
        public void TestGetAllUsers()
        {

        }

        [Fact]
        public void TestGetUser()
        {

        }
    }
}
