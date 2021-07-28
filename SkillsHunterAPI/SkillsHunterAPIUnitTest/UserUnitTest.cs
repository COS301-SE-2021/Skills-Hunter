using System;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Controllers;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.User;
using SkillsHunterAPI.Services;
using Xunit;

namespace SkillsHunterAPIUnitTest.Tests
{
    public class UserUnitTest : SkillsHunterAPIUnitTestBase
    {

        public UserUnitTest()
        {

        }

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

            IActionResult ExpectedResult;

            //Act

            // Act
            //A.CallTo(() => userController.Register(registerRequest)).Returns(());
            var actionResult = userController.Register(registerRequest);


            // Assert
            //Assert.IsAssignableFrom<IActionResult>(actionResult);
            //Assert.Equal(testId, (actionResult.Value as Project).ProjectId);
        }

        [Fact]
        public void TestAuthenticate()
        {

        }

        [Fact]
        public void TestGetCurrentUserId()
        {

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
