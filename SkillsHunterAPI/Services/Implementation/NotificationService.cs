using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Data;
using SkillsHunterAPI.Models.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services.Implementation
{
    public class NotificationService
    {

        private readonly ApplicationDbContext _context;

        public NotificationService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Notification>> GetNotificationsByRecepientId(Guid id)
        {
            //This returns all notications of current logged in user

            return await _context.Notifications.Where(o => o.RecepientId == id).ToListAsync();

        }

        public async Task<IEnumerable<Notification>> GetUnReadNotificationsByRecepientId(Guid id)
        {
            return null;
        }

        public Task UpdatingReadStatus(Guid notificationId)
        {
            return new Task(null);
        }

        Task<Notification> SendNotifications(Notification notification)
        {
            return null;
        }

        Task DeleteNotifications(Guid id)
        {
            return null;
        }
    }
}
