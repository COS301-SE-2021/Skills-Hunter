using SkillsHunterAPI.Models.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Services.Interface
{
    public interface INotificationService
    {


        Task<IEnumerable<Notification>> GetNotificationsByRecepientId(Guid id);

        Task<IEnumerable<Notification>> GetUnReadNotificationsByRecepientId(Guid id);

        Task UpdatingReadStatus(Guid notificationId);

        Task<Notification> SendNotifications(Notification notification);

        Task DeleteNotifications(Guid id);
    }
}
