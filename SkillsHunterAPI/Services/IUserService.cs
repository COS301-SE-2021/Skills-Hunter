using SkillsHunterAPI.Models.User;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services
{
    public interface IUserService
    {
        Task<RegisterResponse> Register(RegisterRequest request);
        Task<LogInResponse> LogIn(LogInRequest request);
        Task<LogOutResponse> LogOut(LogOutRequest request);
        Task<UpdateResponse> UpdateUser(UpdateRequest request);
        Task<DeleteResponse> DeleteUser(DeleteRequest request);
        Task<GetAllResponse> GetAllUsers(GetAllRequest request);
        Task<GetResponse> GetUser(GetUserRequest request);
    }
}
