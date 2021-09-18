using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Data;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.Skill;
using SkillsHunterAPI.Models.Project.Request;
using SkillsHunterAPI.Models.Project.Response;
using SkillsHunterAPI.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsHunterAPI.Models.Skill.Request;
using SkillsHunterAPI.Models.Skill.Entity;
using SkillsHunterAPI.Models.Notification;
using SkillsHunterAPI.Services.Interface;
using SkillsHunterAPI.Models.Project.Entity;
using Microsoft.ML;

namespace SkillsHunterAPI.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;
        private readonly INotificationService _notificationService;

        /// <summary>
        /// We inject the context through the constructor
        /// </summary>
        /// <param name="context"></param>
        public ProjectService(ApplicationDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        //Project

        public async Task<Project> CreateProject(Project project)
        {
            project.ProjectId = new Guid();
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }

        public async Task DeleteProject(Guid id)
        {
            var ProjectToDelete = await _context.Projects.FindAsync(id);
            _context.Projects.Remove(ProjectToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<Project> GetProject(Guid id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetProjectsByOwnerId()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task UpdateProject(Guid projectId, Project project)
        {
            //_context.Entry(project).State = EntityState.Modified;
            Project projectFromDb = await _context.Projects.FindAsync(projectId);

            projectFromDb.Name = project.Name;
            projectFromDb.OpenForApplication = project.OpenForApplication;
            projectFromDb.Owner = project.Owner;
            projectFromDb.Location = project.Location;
            projectFromDb.DateCreated = project.DateCreated;
            projectFromDb.Description = project.Description;
            await _context.SaveChangesAsync();
        }

        //Project Skills

        public async Task AddProjectSkill(ProjectSkill projectSkill)
        {
            Skill skill = await _context.Skills.Where(s => s.SkillId == projectSkill.SkillId).FirstOrDefaultAsync();

            if(skill == null)
            {
                return;
            }

            projectSkill.ProjectSkillId = new Guid();
            _context.ProjectSkills.Add(projectSkill);
            await _context.SaveChangesAsync();

        }

        public async Task RemoveProjectSkill(Guid projectSkillId)
        {
            var projectSkill = await _context.ProjectSkills.FindAsync(projectSkillId);
            _context.ProjectSkills.Remove(projectSkill);
            await _context.SaveChangesAsync();
        }

        public async Task<ProjectSkill> GetProjectSkill(Guid id)
        {
            return await _context.ProjectSkills.FindAsync(id);
        }

        public async Task<IEnumerable<GetProjectSkillResponse>> GetProjectSkillsByProjectId(Guid projectId)
        {
            List<GetProjectSkillResponse> response = new List<GetProjectSkillResponse>();
            List<ProjectSkill> projectSkills = await _context.ProjectSkills.Where(ss => ss.ProjectId == projectId).ToListAsync();

            foreach(ProjectSkill projectSkill in projectSkills)
            {
                GetProjectSkillResponse projectSkillToAdd = await GetProjectSkill(projectSkill.ProjectSkillId, projectId);

                if(projectSkillToAdd != null)
                {
                    response.Add(projectSkillToAdd);
                }
            }

            return response;
        }

        public async Task<GetProjectSkillResponse> GetProjectSkill(Guid projectSkillId, Guid projectId)
        {
            GetProjectSkillResponse response = new GetProjectSkillResponse();
            ProjectSkill projectSkill = await _context.ProjectSkills.Where(ss => ss.ProjectId == projectId && ss.ProjectSkillId == projectSkillId).FirstOrDefaultAsync();

            if(projectSkill != null)
            {
                Skill skill = await _context.Skills.Where(ss => ss.SkillId == projectSkill.SkillId).FirstOrDefaultAsync();
                if(skill != null)
                {
                    response.ProjectSkillId = projectSkill.ProjectSkillId;
                    response.SkillId = skill.SkillId;
                    response.Name = skill.Name;
                    response.Weight = projectSkill.Weight;

                    return response;
                }
            }

            return null;
        }
        public async Task<IEnumerable<GetProjectSkillCollectionResponse>> GetProjectSkillCollectionsByProjectId(Guid projectId)
        {

            List<GetProjectSkillCollectionResponse> response = new List<GetProjectSkillCollectionResponse>();
            //Retrieving the project skills
            List<ProjectSkillCollection> projectSkillCollections = await _context.ProjectSkillCollections.Where(psc => psc.ProjectId == projectId).ToListAsync();

            //Retrieving the skills mappings
            foreach(ProjectSkillCollection projectSkillCollection in projectSkillCollections)
            {
                List<SkillCollectionMap> skillCollectionMaps = await _context.SkillCollectionMaps.Where(scm => scm.SkillCollectionId == projectSkillCollection.SkillCollectionId).ToListAsync();

                SkillCollection skillCollection = await _context.SkillCollections.Where(sc => sc.SkillCollectionId == projectSkillCollection.SkillCollectionId).FirstOrDefaultAsync();

                if (skillCollection != null)
                {
                    GetProjectSkillCollectionResponse skillCollectionToAdd = new GetProjectSkillCollectionResponse();
                    skillCollectionToAdd.ProjectSkillCollectionId = projectSkillCollection.ProjectSkillCollectionId;
                    skillCollectionToAdd.Name = skillCollection.Name;
                    skillCollectionToAdd.Weight = projectSkillCollection.Weight;
                    skillCollectionToAdd.Description = skillCollection.Description;

                    //Retrieving the skills from the maps
                    foreach (SkillCollectionMap skillCollectionMap in skillCollectionMaps)
                    {
                        Skill skill = await _context.Skills.Where(s => s.SkillId == skillCollectionMap.SkillId).FirstOrDefaultAsync();

                        if (skill != null)
                        {
                            //Adding the skill to the response object
                            GetProjectSkillResponse skillToAdd = new GetProjectSkillResponse();
                            skillToAdd.SkillId = skill.SkillId;
                            skillToAdd.Name = skill.Name;
                            skillToAdd.Weight = projectSkillCollection.Weight;

                            skillCollectionToAdd.Skills.Add(skillToAdd);
                        }
                    }

                    response.Add(skillCollectionToAdd);
                }
            }

            return response;
        }

        public  bool ApplyForProject(Guid userId,Guid ProjectId)
        {
            bool applicationSuccess = false;


            Application applicationFromDB = _context.Applications.Where(ss => ss.ApplicantId == userId && ss.ProjectId == ProjectId).FirstOrDefault();
            User userFromDB = _context.Users.Where(ss => ss.UserId == userId).FirstOrDefault();
            Project projectFromDB = _context.Projects.Where(ss => ss.ProjectId == ProjectId).FirstOrDefault();
            if (applicationFromDB != null || userFromDB == null || projectFromDB == null)
            {
                return false;
            }

            

            Application newApplication = new Application();
            newApplication.ApplicationId = new Guid();
            newApplication.ProjectId = ProjectId;
            newApplication.ApplicantId = userId;

             _context.Applications.Add(newApplication);
             _context.SaveChangesAsync();

            //Application application = _context.Applications.Where(ss => ss.ApplicantId == userId && ss.ProjectId == ProjectId).FirstOrDefault();

            /*if (application != null)
            {
                return true;
            }*/

            Guid projectOwnerId = projectFromDB.Owner;
            var Subject = "Project Application";
            var Message = userFromDB.Name + " has applied to be part of your project.";

            Notification newNotification = new Notification();
            newNotification.InitiatorId = userFromDB.UserId;
            newNotification.RecepientId = projectOwnerId;
            newNotification.Subject = Subject;
            newNotification.Message = Message;
            newNotification.IsRead = false;
            newNotification.DateSent = DateTime.Now;


             _notificationService.SendNotifications(newNotification);

           
            return true;
        }



        public bool InviteCandidate(Guid userId, Guid ProjectId, Guid inviteeId, String message)
        {
            bool invitationSuccess = false;


            Invitation existingInvitations = _context.Invitations.Where(ss => ss.InviteeId == inviteeId && ss.ProjectId == ProjectId).FirstOrDefault();
            User ownerFromDB = _context.Users.Where(ss => ss.UserId == userId).FirstOrDefault();
            User inviteeFromDB = _context.Users.Where(ss => ss.UserId == inviteeId).FirstOrDefault();
            Project projectFromDB = _context.Projects.Where(ss => ss.ProjectId == ProjectId).FirstOrDefault();


            if (existingInvitations != null || ownerFromDB == null || inviteeFromDB == null || projectFromDB == null || projectFromDB.Owner != userId)
            {
                return false;
            }


            Invitation newInvitation = new Invitation();

            newInvitation.InviterId = userId;
            newInvitation.InviteeId = inviteeId;
            newInvitation.ProjectId = ProjectId;
            newInvitation.Message = message;
            newInvitation.InviteDate = DateTime.Now;
            newInvitation.InvitationId = new Guid();

            _context.Add(newInvitation);
            _context.SaveChangesAsync();


            //Invitation invitation = _context.Invitations.Where(ss => ss.InviteeId == inviteeId && ss.ProjectId == ProjectId).FirstOrDefault();

            /*if (invitation != null)
            {
                return true;
            }*/


            return true;
        }

        public async Task<ProjectSkillCollection> CreateCollection(CreateSkillCollectionRequest request, Guid projectId)
        {
            //Creating the new SkillCollection object
            SkillCollection skillCollection = new SkillCollection();
            skillCollection.SkillCollectionId = new Guid();
            skillCollection.Name = request.Name;
            skillCollection.Description = request.Description;

            _context.SkillCollections.Add(skillCollection);

            await _context.SaveChangesAsync();

            foreach (AddExistingSkillRequest skillToAdd in request.Skills)
            {
                //Linking the skills with the skillCollection
                SkillCollectionMap skillCollectionMap = new SkillCollectionMap();
                skillCollectionMap.SkillCollectionMapId = new Guid();
                skillCollectionMap.SkillCollectionId = skillCollection.SkillCollectionId;
                skillCollectionMap.SkillId = skillToAdd.SkillId;

                _context.SkillCollectionMaps.Add(skillCollectionMap);
                await _context.SaveChangesAsync();

                //Adding the skills to projecSkills
                /*ProjectSkill projectSkill = new ProjectSkill();
                projectSkill.SkillId = skillToAdd.SkillId;
                projectSkill.ProjectId = projectId;
                projectSkill.Weight = request.Weight;

                await AddProjectSkill(projectSkill);*/
            }

            //Creating the projectSkill collection
            ProjectSkillCollection projectSkillCollection = new ProjectSkillCollection();
            projectSkillCollection.ProjectSkillCollectionId = new Guid();
            projectSkillCollection.SkillCollectionId = skillCollection.SkillCollectionId;
            projectSkillCollection.ProjectId = projectId;
            projectSkillCollection.Weight = request.Weight;

            //Saving the SkillCollection object on the database
            _context.ProjectSkillCollections.Add(projectSkillCollection);
            await _context.SaveChangesAsync();

            return projectSkillCollection;
        }

        public async Task<ProjectSkillCollection> GetCollection(Guid collectionId)
        {
            ProjectSkillCollection result = null;

            return result;
        }

        public async Task<ProjectSkillCollection> UpdateCollection(ProjectSkillCollection request)
        {
            ProjectSkillCollection result = null;


            return result;
        }

        public async Task RemoveCollection(Guid collectionId)
        {
        }

        public async Task AddSkillToCollection(Guid skillId, Guid collectionId)
        {

        }

        public async Task<List<ProjectSkillCollection>> GetCollectionsByProject(Guid projectId)
        {
            List<ProjectSkillCollection> result = new List<ProjectSkillCollection>();

            return result;
        }

        public async Task<Skill> AddNewSkill(AddSkillRequest addSkillRequest)
        {
            //Adding the new skill
            Skill skill = new Skill();
            skill.SkillId = new Guid();
            skill.Name = addSkillRequest.Name;
            skill.Status = SkillStatus.Pending;
            _context.Skills.Add(skill);

            await _context.SaveChangesAsync();

            //Linking the skills with the categories
            foreach (GetCategoryByIdRequest category in addSkillRequest.Categories)
            {
                SkillCategory skillCategory = new SkillCategory();
                skillCategory.SkillCategoryId = new Guid();
                skillCategory.SkillId = skill.SkillId;

                //TODO: Check if the category exists before using the id
                skillCategory.CategoryId = category.CategoryId;

                _context.SkillCategories.Add(skillCategory);
                await _context.SaveChangesAsync();
            }

            return skill;
        }


        //Matching algorithm
        public async Task<List<MatchCandidateResponse>> MatchCandidates(Guid projectId, string userId = null)
        {
            List<MatchCandidateResponse> response = new List<MatchCandidateResponse>();
            int numProjectSkills = 0;   //To store the number of skills in the project
            //int numUserSkills = 0;
            double matchPercentage = 0; //To store the final match percentage

            //Getting the project skills
            List<GetProjectSkillResponse> projectSkills = (List<GetProjectSkillResponse>)await GetProjectSkillsByProjectId(projectId);

            //getting the skills from project skill collections
            List<GetProjectSkillCollectionResponse> projectSkillCollections = (List<GetProjectSkillCollectionResponse>)await GetProjectSkillCollectionsByProjectId(projectId);

            //Getting the number of skills in the project
            numProjectSkills += projectSkills.Count;

            //getting all users and skills
            List<User> users = new List<User>();
            List<Skill> skills = new List<Skill>();

            if (userId != null)//Getting the specific user
            {
                User user = await _context.Users.Where(u => u.UserId == new Guid(userId)).FirstOrDefaultAsync();
                if (user != null)
                {
                    users.Add(user);
                }
            }
            else
            {
                //getting the users that match a specific skill
                foreach (GetProjectSkillResponse projectSkill in projectSkills)
                {
                    List<UserSkill> userSkills = await _context.UserSkills.Where(skill => skill.SkillId == projectSkill.SkillId).ToListAsync();

                    Skill skill = await _context.Skills.Where(s => s.SkillId == projectSkill.SkillId).FirstOrDefaultAsync();

                    if (skill != null)
                    {
                        skills.Add(skill);
                    }

                    if (userSkills != null)
                    {
                        foreach (UserSkill userSkill in userSkills)
                        {
                            User user = await _context.Users.Where(u => u.UserId == userSkill.UserId).FirstOrDefaultAsync();

                            if (user != null && !users.Contains(user))
                            {
                                users.Add(user);
                            }
                        }
                    }
                }

                foreach (GetProjectSkillCollectionResponse projectSkillCollection in projectSkillCollections)
                {

                    foreach (GetProjectSkillResponse skillFromCollection in projectSkillCollection.Skills)
                    {

                        Skill skill = await _context.Skills.Where(s => s.SkillId == skillFromCollection.SkillId).FirstOrDefaultAsync();

                        if (skill != null)
                        {
                            skills.Add(skill);
                        }

                        List<UserSkill> userSkills = await _context.UserSkills.Where(skill => skill.SkillId == skillFromCollection.SkillId).ToListAsync();

                        if (userSkills != null)
                        {
                            foreach (UserSkill userSkill in userSkills)
                            {
                                User user = await _context.Users.Where(u => u.UserId == userSkill.UserId).FirstOrDefaultAsync();

                                if (user != null && !users.Contains(user))
                                {
                                    users.Add(user);
                                }
                            }
                        }
                    }
                }
            }

            

            //Matching the users
            if(users.Count == 0)
            {
                return response;
            }

            foreach(User user in users)
            {
                matchPercentage = 0;
                List<UserSkill> userSkills = await _context.UserSkills.Where(u => u.UserId == user.UserId).ToListAsync();

                if(userSkills != null)
                {
                    MatchCandidateResponse matchCandidate = new MatchCandidateResponse();
                    matchCandidate.Name = user.Name;
                    matchCandidate.UserId = user.UserId;
                    matchCandidate.Email = user.Email;
                    matchCandidate.Surname = user.Surname;

                    //Matching the user skills
                    if(projectSkills != null)
                    {
                        foreach (UserSkill userSkill in userSkills)
                        {
                            foreach(GetProjectSkillResponse projectSkill in projectSkills)
                            {
                                if(projectSkill.SkillId == userSkill.SkillId && projectSkill.Weight>0 && userSkill.Weight > 0)
                                {
                                    double percentage = getSkillMatchingPercentage(userSkill.Weight, projectSkill.Weight);

                                    if(percentage > 0.0)
                                    {
                                        MatchingSkill matchingSkill = new MatchingSkill();
                                        matchingSkill.SkillId = projectSkill.SkillId;
                                        matchingSkill.Name = projectSkill.Name;
                                        matchingSkill.Weight = userSkill.Weight;
                                        matchingSkill.Percentage = percentage;

                                        matchCandidate.MatchingSkills.Add(matchingSkill);
                                        matchPercentage += percentage;
                                    }
                                }

                               // numProjectSkills++;
                            }
                        }
                    }

                    //Matching the skills from the project skill collections
                    if(projectSkillCollections != null)
                    {
                        foreach (UserSkill userSkill in userSkills)
                        {
                            foreach (GetProjectSkillCollectionResponse projectSkillCollection in projectSkillCollections)
                            {
                                foreach (GetProjectSkillResponse skillFromCollection in projectSkillCollection.Skills)
                                {
                                    if (skillFromCollection.SkillId == userSkill.SkillId && skillFromCollection.Weight > 0 && userSkill.Weight > 0)
                                    {
                                        double percentage = getSkillMatchingPercentage(userSkill.Weight, projectSkillCollection.Weight);

                                        if(percentage > 0.0)
                                        {
                                            MatchingSkill matchingSkill = new MatchingSkill();
                                            matchingSkill.SkillId = skillFromCollection.SkillId;
                                            matchingSkill.Name = skillFromCollection.Name;
                                            matchingSkill.Weight = userSkill.Weight;
                                            matchingSkill.Percentage = percentage;

                                            matchPercentage += percentage;

                                            matchCandidate.MatchingSkills.Add(matchingSkill);
                                        }
                                    }

                                    //numProjectSkills++;
                                }
                            }
                        }
                    }

                    if(matchPercentage > 0.0 && matchCandidate.MatchingSkills.Count > 0)
                    {
                        //matchCandidate.numProjectSkills = numProjectSkills;
                        matchCandidate.Percentage = (1.0 *matchPercentage) / (1.0*(skills.Count));

                        matchCandidate = (MatchCandidateResponse) await ProcessExternalWorkExperience(matchCandidate, skills);

                        if (matchCandidate.Percentage > 0.0)
                        {
                            response.Add(matchCandidate);
                        }
                    }
                }
            }

            return sortCandidates(response);

        }

        private async Task<MatchCandidateResponse> ProcessExternalWorkExperience(MatchCandidateResponse candidate, List<Skill> projectSkills)
        {
            /*string paragraph = "Testing Tokenization with ML.net. Second sentence.";

            var mlContext = new MLContext();

            var emptyData = new List<TextData>();
            var data = mlContext.Data.LoadFromEnumerable(emptyData);
            var tokenization = mlContext.Transforms.Text.TokenizeIntoWords("Tokens", "Text", separators: new[] { ' ', '?' });

            var tokenModel = tokenization.Fit(data);

            var engine = mlContext.Model.CreatePredictionEngine<TextData, TextTokens>(tokenModel);

            var tokens = engine.Predict(new TextData() { Text = paragraph });

            candidate.Email = string.Join(",", cleanTokens(tokens.Tokens));*/


            //retrieving the work experience of the person
            List<ExternalWorkExperience> experiences = await _context.ExternalWorkExperiences.Where(w => w.UserId == candidate.UserId).ToListAsync();

            if(experiences != null)
            {
                foreach (ExternalWorkExperience experience in experiences)
                {
                    string[] tokens = Tokenize(experience.Description);

                    foreach(MatchingSkill skill in candidate.MatchingSkills)
                    {
                        if(MatchSkillFromExperienceDescription(skill.Name, tokens))
                        {
                            TimeSpan ts = experience.EndDate - experience.StartDate;

                            double years = ts.TotalDays / 365;

                            skill.YearsOfExperience = Math.Round((double)years, 1);
                        }
                    }
                }
            }

            return candidate;
        }

        private bool MatchSkillFromExperienceDescription(string skillName, string[] descriptionTokens)
        {

            //Tokenizing the name of the skill
            string[] skillNameTokens = Tokenize(skillName);

            int numNameTokens = skillNameTokens.Length; //The number of token returned from tokenizing the skill name

            for (int d = 0; d < descriptionTokens.Length; d++)
            {
                if (descriptionTokens[d].ToLower() == skillNameTokens[0].ToLower())
                {
                    bool match = true;

                    for (int i = 1; i < numNameTokens; i++)
                    {
                        if (i > descriptionTokens.Length || descriptionTokens[d + i].ToLower() != skillNameTokens[i].ToLower())
                        {
                            match = false;
                            break;
                        }
                    }

                    if (match)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        private string[] Tokenize(string input)
        {
            //string paragraph = "Testing Tokenization with ML.net. Second sentence.";

            var mlContext = new MLContext();

            var emptyData = new List<TextData>();
            var data = mlContext.Data.LoadFromEnumerable(emptyData);
            var tokenization = mlContext.Transforms.Text.TokenizeIntoWords("Tokens", "Text", separators: new[] { ' ', '?' });

            var tokenModel = tokenization.Fit(data);

            var engine = mlContext.Model.CreatePredictionEngine<TextData, TextTokens>(tokenModel);

            var tokens = engine.Predict(new TextData() { Text = input });

            return cleanTokens(tokens.Tokens);
        }

        private string[] cleanTokens(string[] tokens)
        {
            for(int i = 0; i < tokens.Length; i++)
            {
                string token = tokens[i];

                if(!char.IsLetter(token[token.Length - 1]))
                {
                    string newToken = "";

                    for(int j = 0; j < token.Length - 1; j++)
                    {
                        newToken += token[j];
                    }
                    tokens[i] = newToken;
                }
            }
            return tokens;
        }

        private List<MatchCandidateResponse> sortCandidates(List<MatchCandidateResponse> candidates)
        {
            //List<MatchCandidateResponse> sortedCandidates = new List<MatchCandidateResponse>();

            bool swapped = true;

            while(swapped)
            {
                swapped = false;
                for(int i = 0; i < candidates.Count - 1; i++)
                {
                    if(candidates[i].Percentage < candidates[i + 1].Percentage)
                    {
                        MatchCandidateResponse first = candidates[i + 1];
                        MatchCandidateResponse second = candidates[i];

                        candidates[i] = first;
                        candidates[i + 1] = second;

                        swapped = true;
                    }
                }
            }

            return candidates;
        }

        private int getMatchingSkillWeight(Guid userSkillId, List<GetProjectSkillResponse> projectSkills)
        {
            foreach(GetProjectSkillResponse projectSkill in projectSkills)
            {
                if (projectSkill.SkillId == userSkillId)
                    return projectSkill.Weight;
            }
            return 0;
        }

        private double getSkillMatchingPercentage(int userSkillWeight, int projectSkillWeight)
        {
            double percentage =  (1.0 *userSkillWeight) / (1.0* projectSkillWeight);
            percentage *= 100.0;

            if (percentage > 100.0)
            {
                return 100.0;
            }    

            return percentage;
        }

        public async Task<List<GetApplicationsResponse>> GetApplicationsByProjectId(Guid projectId)
        {
            List<GetApplicationsResponse> response = new List<GetApplicationsResponse>();

            //Getting the list of applications
            List<Application> applications = await _context.Applications.Where(a => a.ProjectId == projectId).OrderByDescending(a => a.Date).ToListAsync();

            if(applications != null)
            {
                foreach(Application application in applications)
                {
                    List<MatchCandidateResponse> matches = await MatchCandidates(projectId, application.ApplicantId.ToString());

                    if(matches != null)
                    {
                        MatchCandidateResponse match = matches[0];

                        GetApplicationsResponse applicant = new GetApplicationsResponse();
                        applicant.UserId = match.UserId;
                        applicant.Surname = match.Surname;
                        applicant.Name = match.Name;
                        applicant.Email = match.Email;
                        applicant.MatchingSkills = match.MatchingSkills;
                        applicant.ApplicationDate = application.Date;
                        applicant.Percentage = match.Percentage;

                        response.Add(applicant);
                    }
                } 
            }

            return response;
        }


        public async Task<IEnumerable<Invitation>> GetInvitationsByProjectId(Guid projectId)
        {
            return await _context.Invitations.Where(a => a.ProjectId == projectId).OrderByDescending(a => a.InviteDate).ToListAsync();
        }




    }

    public class TextData
    {
        public string Text { get; set; }
    }

    public class TextTokens : TextData
    {
        public string[] Tokens { get; set; }
    }
}
