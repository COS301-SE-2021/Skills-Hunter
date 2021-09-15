using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SkillsHunterAPI.Hubs;
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

        public NotificationController(IHubContext<NotificationHub> notificationHubContext, IHubContext<NotificationUserHub> notificationUserHubContext, IUserConnectionManager userConnectionManager)
        {
            _notificationHubContext = notificationHubContext;
            _notificationUserHubContext = notificationUserHubContext;
            _userConnectionManager = userConnectionManager;
        }


        public IActionResult Index()
        {
            return View();
        }




    }
}
