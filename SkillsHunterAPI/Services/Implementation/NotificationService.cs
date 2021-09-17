using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Data;
using SkillsHunterAPI.Models.Notification;
using SkillsHunterAPI.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services.Implementation
{
    public class NotificationService:INotificationService
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
            //This returns all unread notications of current logged in user

            return await _context.Notifications.Where(o => o.RecepientId == id && o.IsRead==false).ToListAsync();
        }

        public Task UpdatingReadStatus(Guid notificationId)
        {
            return new Task(null);
        }

        public async Task<Notification> SendNotifications(Notification notification)
        {

            notification.NotificationId = new Guid();
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return notification;

        }

        public Task DeleteNotifications(Guid id)
        {
            return null;
        }
    }
}
