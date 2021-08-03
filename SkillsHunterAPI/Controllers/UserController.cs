using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using SkillsHunterAPI.Models.Project.Request;
using System.IO;
using System.Net.Http.Headers;

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



        [HttpGet]
        [Route("api/[controller]/getCurrentUserId")]
        public Guid GetCurrentUserId(){
            Guid result = new Guid();
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims; 
                var id = claims.Where(x => x.Type == ClaimTypes.Name).FirstOrDefault();
                result =  Guid.Parse(id.Value);
            }else
            {
                throw new Exception("Could not retrieve current user id");
            }

            return result;         
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/[controller]/register")]
        public IActionResult Register([FromBody]RegisterRequest request)
        {
            // map model to entity
            User user = new User()
            {
                Name = request.Name,
                Surname = request.Surname,
                Phone = request.Phone,
                Email = request.Email,
                UserType = request.Role,
                StartDate = request.StartDate,
                OpenForWork = request.OpenForWork,
            };

            try
            {
                // create user
                _userService.Create(user, request.Password);
                return Ok();
            }
            catch (Exception error)
            {
                // return error message if there was an exception
                return BadRequest(new 
                    { 
                        message = error.Message 
                    });
            }

        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/[controller]/authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateRequest request)
        {

            var user = _userService.Authenticate(request.Email, request.Password);

            if (user == null)
                return BadRequest(new { message = "Email or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Skills hunter validation string");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()),
                    new Claim(ClaimTypes.Role, user.UserType.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info and authentication token
            return Ok(new AuthenticateResponse()
            {
                Id = user.UserId,
                Name = user.Name,
                Surname = user.Surname,
                Role = user.UserType,
                Token = tokenString
            });
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
                GetUserResponse tempUser = await GetUser(user.UserId.ToString());

                response.Add(tempUser);
            }

            return null;
        }

        [HttpGet]
        [Route("api/[controller]/getUser/{id}")]
        public async Task<GetUserResponse> GetUser(string id)
        {
            User user = await _userService.GetUser(new Guid(id));

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

        [HttpPost, DisableRequestSizeLimit]
        [Route("api/[controller]/uploadProfileImage")]
        public async Task<IActionResult> UploadProfileImage(){
            try
            {
                // Upload Image Profile code here
                var formCollection = await Request.ReadFormAsync();
                
                if(formCollection.Files.Count == 0)
                    return BadRequest();

                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    Image profileImage = new Image()
                    {
                        UserId = GetCurrentUserId(),
                        //UserId = Guid.NewGuid(),
                        Path = dbPath
                    };

                    var response = await _userService.uploadProfileImage(profileImage);

                    return Ok(response);
                }
                else
                {
                    return BadRequest();
                }              
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here
                
                 return StatusCode(500, $"Internal server error: {error}");
            }
        }

        [HttpGet]
        [Route("api/[controller]/getImage")]
        public async Task<IActionResult> GetImage(GetImageRequest request){
            try
            {
                // Get Image code here
                Image response = await _userService.GetImage(new Guid(request.ImageId));

                return Ok(new GetImageResponse(){
                    result = response
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here
                
                return StatusCode(500, $"Internal server error: {error}");
            }
        }

        [HttpGet]
        [Route("api/[controller]/removeImage")]
        public async Task<IActionResult> RemoveImage(RemoveImageRequest request){
            try
            {
                // Get Image code here
                var response = await _userService.RemoveImage(new Guid(request.ImageId));

                return Ok(new RemoveImageResponse(){
                    result = response
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here
                
                return StatusCode(500, $"Internal server error: {error}");
            }
        }

        [HttpGet]
        [Route("api/[controller]/getImageByUserId")]
        public async Task<IActionResult> GetImageByUser(GetImageByUserRequest request){
            try
            {
                // Get Image code here
                var response = await _userService.GetImageByUser(new Guid(request.UserId));

                return Ok(new GetImageByUserResponse(){
                    result = response
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here
                
                return StatusCode(500, $"Internal server error: {error}");
            }
        }

        [HttpGet]
        [Route("api/[controller]/getImageByUser")]
        public async Task<IActionResult> GetImageByUser(){
            try
            {
                // Get Image code here
                var response = await _userService.GetImageByUser(GetCurrentUserId());

                return Ok(new RemoveImageResponse(){
                    result = response
                });
            }
            catch (Exception error)
            {
                // return error message if there was an exception code here
                
                return StatusCode(500, $"Internal server error: {error}");
            }
        }
        [HttpGet]
        [Route("api/[controller]/addUserSkill")]
        public IActionResult AddUserSkill(AddExistingSkillRequest request)
        {
            return Ok();
        }

        [HttpGet]
        [Route("api/[controller]/addNewSkill")]
        public IActionResult AddNewSkill(AddNewSkillRequest request)
        {
            return Ok();
        }

        /*[HttpGet]
        [Route("api/[controller]/AddProjectSkill")]
        public IActionResult AddNewSkill(AddNewSkillRequest request)
        {
            return Ok();
        }*/

        [HttpGet]
        [Route("api/[controller]/addUserSkillCollection")]
        public IActionResult AddUserSkillCollection(AddSkillCollectionRequest request)
        {
            return Ok();
        }
    }
}
