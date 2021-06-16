namespace SkillsHunterAPI.Controllers.Responses
{
    //This class will be used to contain all the User data that is sent through with a Project creation or update request
    public class registerResponse
    {
        public bool success{get;set;}
        public string[] errors{get;set;}
        public registerResponse(){
            errors = new string[0];
        }
    }
}