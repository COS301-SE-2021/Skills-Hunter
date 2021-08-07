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
        private IUserService userService = A.Fake<IUserService>();
        private UserController userController;

        [Fact]
        public void TestRegister()
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
            IActionResult res;
            A.CallTo(() => userController.Register(registerRequest));
            var actionResult = userController.Register(registerRequest);


            // Assert
            var result = actionResult.ExecuteResultAsync(new ActionContext());
            Assert.IsAssignableFrom<IActionResult>(actionResult);
            //Assert.True(result.Equals(obj: OkObjectResult));
            //Assert.IsAssignableFrom<IActionResult>(actionResult);
            //Assert.Equal(testId, (actionResult.Value as Project).ProjectId);
        }

        [Fact]
        public void TestAuthenticate()
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

            //A.CallTo(() => userController.Authenticate(authenticateRequest)).Returns(authenticateResponse);

            //Act

        }

        [Fact]
        public void TestGetCurrentUserId()
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
