using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SkillsHunterAPI.Hubs;
using SkillsHunterAPI.Models.Notification;
using SkillsHunterAPI.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Controllers
{
    public class NotificationController:Controller
    {

        private readonly IHubContext<NotificationHub> _notificationHubContext;

        private readonly IHubContext<NotificationUserHub> _notificationUserHubContext;

        private readonly IUserConnectionManager _userConnectionManager;

        private UserController _userController;

        private readonly INotificationService _notificationService;


        public NotificationController(IHubContext<NotificationHub> notificationHubContext, IHubContext<NotificationUserHub> notificationUserHubContext, IUserConnectionManager userConnectionManager, UserController userController, INotificationService notificationService)
        {
            _notificationHubContext = notificationHubContext;
            _notificationUserHubContext = notificationUserHubContext;
            _userConnectionManager = userConnectionManager;
            _userController = userController;
            _notificationService = notificationService;

        }



        //This initialize the user controller object to be accessible this side.
        private void InitControllers()
        {
            // We can't set this at Ctor because we don't have our local copy yet
            // Access to Url 
            _userController.Url = Url;


            //This gives Access to User
            _userController.ControllerContext = ControllerContext;

        }




        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public async Task<ActionResult> SendToSpecificUser(Message model)
        {


            //This initialize the user controller object to be accessible this side.
            InitControllers();


            //This gets identity of the user currently authenticated.
            var LoggedInOwner = _userController.GetCurrentUserId().ToString();


            var connections = _userConnectionManager.GetUserConnections(LoggedInOwner);
            if (connections != null && connections.Count > 0)
            {
                foreach (var connectionId in connections)
                {
                    await _notificationUserHubContext.Clients.Client(connectionId).SendAsync("sendToUser", model.MessageContent, model.IsRead);
                }
            }
            return View();

       
        }





        
        //This is for the Notifications entity 
        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getNotifications")]
        public async Task<IEnumerable<Notification>> GetNotificationsByRecepientId()
        {
            InitControllers();
            //This get the current logged in user
            var LoggedInOwner = _userController.GetCurrentUserId();

                return await _notificationService.GetNotificationsByRecepientId(LoggedInOwner);
        }


        //This is for the Notifications entity 
        [HttpGet]//This tells ASP.Net that the method will handle http get request
        [Route("api/[controller]/getUnreadNotifications")]
        public async Task<IEnumerable<Notification>> GetUnReadNotificationsByRecepientId()
        {
            InitControllers();
            //This get the current logged in user
            var LoggedInOwner = _userController.GetCurrentUserId();

            return await _notificationService.GetUnReadNotificationsByRecepientId(LoggedInOwner);
        }





    }





}

