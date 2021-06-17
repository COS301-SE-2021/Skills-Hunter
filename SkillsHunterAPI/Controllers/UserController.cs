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


        // [HttpPost]
        // [Route("api/[controller]/register")]
        
        // public async Task<RegisterResponse> Register(RegisterRequest request)
        // {
        //     var response = await _userService.Register(request);
        //     return response;
        // }


        // // [HttpPost]
        // // [Route("api/[controller]/login")]
        // // public async Task<LogInResponse> LogIn(LogInRequest request){
        // //     var response = await _userService.LogIn(request);
        // //     return response;
        // // }

        // // [HttpGet]
        // // [Route("api/[controller]/logOut")]
        // // public async Task<LogOutResponse> LogOut(){
        // //     var response = await _userService.LogOut(new LogOutRequest());
        // //     return response;
        // // }

        // // [HttpPost]
        // // [Route("api/[controller]/update")]
        // // public async Task<UpdateResponse> UpdateUser(UpdateRequest request){
        // //     var response = await _userService.UpdateUser(request);
        // //     return response;
        // // }

        // // [HttpGet]
        // // [Route("api/[controller]/delete")]
        // // public async Task<DeleteResponse> DeleteUser(DeleteRequest request){
        // //     var response = await _userService.DeleteUser(request);
        // //     return response;
        // // }

        // // [HttpGet]
        // // [Route("api/[controller]/getall")]
        // // public async Task<GetAllResponse> GetAllUsers()
        // // {
        // //     var response = await _userService.GetAllUsers(new GetAllRequest());
        // //     return response;
        // // }

        // // [HttpGet]
        // // [Route("api/[controller]/get")]
        // // public async Task<GetResponse> GetUser(GetUserRequest request)
        // // {
        // //     var response = await _userService.GetUser(request);
        // //     return response;
        // // }
    }
}
