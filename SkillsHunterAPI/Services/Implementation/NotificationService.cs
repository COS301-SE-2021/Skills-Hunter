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

        public async Task UpdatingReadStatus(Guid notificationId)
        {
            Notification existingNotification =await  _context.Notifications.Where(s => s.NotificationId == notificationId).FirstOrDefaultAsync();
            
            if(existingNotification != null)
            {
                existingNotification.IsRead = !existingNotification.IsRead;

                await _context.SaveChangesAsync();

            }
        }

        public async Task<Notification> SendNotifications(Notification notification)
        {

            notification.NotificationId = new Guid();
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return notification;

        }

        public async Task<Notification> DeleteNotifications(Guid id)
        {
            var result = await _context.Notifications.FindAsync(id);

            if (result != null)
            {
                _context.Notifications.Remove(result);
            }

            await _context.SaveChangesAsync();
            return result;
        }
    }
}
