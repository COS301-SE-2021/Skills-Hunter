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
using SkillsHunterAPI.Models.Skill;
using Microsoft.AspNetCore.Http;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Models.User.Request;
using SkillsHunterAPI.Models.User.Response;

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
        public async Task<IActionResult> Register([FromBody]RegisterRequest request)
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
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest request)
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

            AuthenticateResponse response = new AuthenticateResponse();
            response.UserId = user.UserId;
            response.Name = user.Name;
            response.Surname = user.Surname;
            response.Email = user.Email;
            response.Phone = user.Phone;
            response.OpenForWork = user.OpenForWork;
            response.Role = user.UserType;
            response.Token = tokenString;

            return Ok(response);
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
        public async Task<GetUserResponse> UpdateUser([FromBody]UpdateUserRequest request)
        {
            Guid LoggedInUser = GetCurrentUserId();
            await _userService.UpdateUser(request,LoggedInUser);

            //Updating user skills
            if(request.UserSkills != null)
            {
                foreach (AddExistingSkillRequest userSkill in request.UserSkills)
                {
                    UserSkill UserSkillToUpdate = new UserSkill();
                    UserSkillToUpdate.SkillId = userSkill.SkillId;
                    UserSkillToUpdate.UserId = GetCurrentUserId();
                    UserSkillToUpdate.Weight = userSkill.Weight;
                    UserSkillToUpdate.UserId = LoggedInUser;

                    await _userService.UpdateUserSkill(UserSkillToUpdate);
                }
            }
            

            UpdateUserResponse response = new UpdateUserResponse();
            response.Success = true;

            GetUserRequest getUser = new GetUserRequest();
            getUser.UserId = LoggedInUser;
            return await GetUser(getUser.UserId);
           
        }

        [HttpPost]
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
                GetUserRequest req = new GetUserRequest();
                req.UserId = user.UserId;
                GetUserResponse tempUser = await GetUser(req.UserId);

                response.Add(tempUser);
            }

            return response;
        }

        [HttpGet]
        [Route("api/[controller]/getUser")]
        public async Task<GetUserResponse> GetUser([FromQuery] Guid request)
        {
            User user = await _userService.GetUser(request);

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
            response.UserType = user.UserType;

            //Retrieving the userskills
            GetUserSkillsRequest skillsRequest = new GetUserSkillsRequest();
            skillsRequest.UserId = request;
            response.UserSkills = (List<GetUserSkillResponse>)await _userService.GetUserSkillsByUserId(user.UserId);

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

        [HttpPost]
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
        [HttpPost]
        [Route("api/[controller]/addUserSkill")]
        public IActionResult AddUserSkill(AddExistingSkillRequest request)
        {
            Guid LoggedInUser = GetCurrentUserId();


            return (IActionResult)_userService.AddUserSkill(request, LoggedInUser);

        }

        [HttpPost]
        [Route("api/[controller]/addNewSkill")]
        public async Task<IActionResult> AddNewSkill(AddNewSkillRequest request)
        {

            Guid user = GetCurrentUserId();
           Skill skill = await _userService.AddNewSkill(request);


            //Checking if the skill is added and linking it with the user
            if (skill != null)
            {
                AddExistingSkillRequest skillToLink = new AddExistingSkillRequest();
                skillToLink.SkillId = skill.SkillId;
                skillToLink.Weight = request.Weight;

                return AddUserSkill(skillToLink);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/[controller]/createUserSkillCollection")]
        public IActionResult CreateUserSkillCollection(CreateSkillCollectionRequest request)
        {
            Guid LoggedInUser = GetCurrentUserId();

            //Create the skill collection from request


            return (IActionResult)_userService.CreateUserSkillCollection(request, LoggedInUser);


        }


        [HttpGet]
        [Route("api/[controller]/getUserSkillsByUserId")]
        public async Task<IEnumerable<GetUserSkillResponse>> GetUserSkillsByUserId([FromQuery] Guid  userId)
        {
            return await _userService.GetUserSkillsByUserId(userId);
        }

    }
}
