using System;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace SkillsHunterAPI.Controllers
{
    [Authorize]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/[controller]/register")]
        public async Task<RegisterResponse> Register([FromBody]RegisterRequest request)
        {
            return new RegisterResponse();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/[controller]/login")]
        public async Task<LogInResponse> LogIn([FromBody]LogInRequest request)
        {
            return new LogInResponse();
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
        public Task<UpdateResponse> UpdateUser([FromBody]UpdateRequest request)
        {
            //var response = await _userService.UpdateUser(request);
            return null;
        }

        [HttpGet]
        [Route("api/[controller]/delete")]
        public async Task<DeleteResponse> DeleteUser([FromBody]DeleteRequest request)
        {
            var response = await _userService.DeleteUser(request);
            return response;
        }

        [HttpGet]
        [Route("api/[controller]/getAllUsers")]
        public async Task<IEnumerable<GetUserResponse>> GetAllUsers()
        {
            List<GetUserResponse> response = new List<GetUserResponse>();

            List<User> usersFromDb = (List<User>)await _userService.GetAllUsers();

            foreach (User user in usersFromDb)
            {
                GetUserRequest getUserRequest = new GetUserRequest();
                getUserRequest.UserId = user.UserId;
                GetUserResponse tempUser = await GetUser(getUserRequest);

                response.Add(tempUser);
            }

            return null;
        }

        [HttpGet]
        [Route("api/[controller]/getUser/{id}")]
        public async Task<GetUserResponse> GetUser([FromRoute]GetUserRequest getUserRequest)
        {
            User user = await _userService.GetUser(getUserRequest.UserId);

            GetUserResponse response = new GetUserResponse();

            if (user == null)
            {
                return null;
            }

            response.Email = user.Email;
            response.Name = user.Name;
            response.OpenForWork = user.OpenForWork;
            response.Phone = user.Phone;
            response.Surname = user.Surname;
            response.UserId = user.UserId;

            return response;
        }
    }
}
