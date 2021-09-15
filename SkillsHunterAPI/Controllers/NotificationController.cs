﻿using Microsoft.AspNetCore.Mvc;
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

        public NotificationController(IHubContext<NotificationHub> notificationHubContext, IHubContext<NotificationUserHub> notificationUserHubContext, IUserConnectionManager userConnectionManager, UserController userController)
        {
            _notificationHubContext = notificationHubContext;
            _notificationUserHubContext = notificationUserHubContext;
            _userConnectionManager = userConnectionManager;
            _userController = userController;
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
    }




}
}
