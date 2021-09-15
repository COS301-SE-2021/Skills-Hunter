using SkillsHunterAPI.Models.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services.Interface
{
    public interface INotificationService
    {


        Task<IEnumerable<Notification>> GetNotificationsByOwnerId();

        Task<IEnumerable<Notification>> GetUnReadNotificationsByOwnerId();

        Task UpdatingReadStatus(Guid notificationId);

        Task<Notification> SendNotifications(Notification notification);

        Task DeleteNotifications(Guid id);
    }
}
