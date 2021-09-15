using SkillsHunterAPI.Models.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services.Implementation
{
    public class NotificationService
    {
        Task<IEnumerable<Notification>> GetNotificationsByOwnerId()
        {
            return null;
        }

        Task<IEnumerable<Notification>> GetUnReadNotificationsByOwnerId()
        {
            return null;
        }

        Task UpdatingReadStatus(Guid notificationId)
        {
            return null;
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
