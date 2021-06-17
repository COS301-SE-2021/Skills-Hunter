using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Controllers
{
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost]
        [Route("api/[controller]/register")]

        public async Task<RegisterResponse> Register(RegisterRequest request)
        {
            User newUser = new User();
            newUser.Name = request.Name;
            newUser.Surname = request.Surname;
            newUser.Phone = request.Phone;
            newUser.Password = request.Password;
            newUser.UserType = request.Role;
            //newUser.StartDate = request.St
            newUser = await _userService.AddUser(newUser);

            RegisterResponse response = new RegisterResponse();

            if (newUser != null)
            {
                response.Successful = true;
            }
            else
            {
                response.Successful = false;
            }

            return response;
        }


        [HttpPost]
        [Route("api/[controller]/login")]
        public async Task<LogInResponse> LogIn(LogInRequest request)
        {
            User loginUser = await _userService.LogIn(request.Email, request.Password);

            LogInResponse response = new LogInResponse();

            if (loginUser == null)
            {
                response.Validated = false;
            }
            else
            {
                response.UserName = loginUser.Name;
                response.UserId = response.UserId;
                response.Validated = true;
            }

            return response;
        }

        [HttpGet]
        [Route("api/[controller]/logOut")]
        public Task<LogOutResponse> LogOut()
        {
           // var response = await _userService.LogOut(new LogOutRequest());
            return null;
        }

        [HttpPost]
        [Route("api/[controller]/update")]
        public Task<UpdateResponse> UpdateUser(UpdateRequest request)
        {
            //var response = await _userService.UpdateUser(request);
            return null;
        }

        [HttpGet]
        [Route("api/[controller]/delete")]
        public async Task<DeleteResponse> DeleteUser(DeleteRequest request)
        {
            var response = await _userService.DeleteUser(request);
            return response;
        }

        [HttpGet]
        [Route("api/[controller]/getall")]
        public async Task<GetAllResponse> GetAllUsers()
        {
            //var response = await _userService.GetAllUsers(new GetAllRequest());
            return null;
        }

        [HttpGet]
        [Route("api/[controller]/get")]
        public async Task<GetResponse> GetUser(GetUserRequest request)
        {
            //var response = await _userService.GetUser(request);
            return null;
        }
    }
}
