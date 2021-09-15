using Microsoft.AspNetCore.SignalR;
using SkillsHunterAPI.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Hubs
{
    public class NotificationUserHub:Hub
    {
        
        //defines the IUserConnectionManager object
        private readonly IUserConnectionManager _userConnectionManager;

        public NotificationUserHub(IUserConnectionManager userConnectionManager)
        {
            _userConnectionManager = userConnectionManager;
        }

        public string GetConnectionId()
        {
            
            var httpContext = this.Context.GetHttpContext();

            var userId = httpContext.Request.Query["userId"];

            _userConnectionManager.KeepUserConnection(userId, Context.ConnectionId);

            return Context.ConnectionId;
        }

        //This function is called when a connection in the hub is terminated/closed.
        public async override Task OnDisconnectedAsync(Exception exception)
        {
            //get the connectionId
            var connectionId = Context.ConnectionId;

            _userConnectionManager.RemoveUserConnection(connectionId);

            //adding dump code to follow the template of Hub > OnDisconnectedAsync
            var value = await Task.FromResult(0);
        }
    }

}

