using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Notification
{
    public class NotificationResponse
    {
        public Guid NotificationId { get; set; }

        public Guid Recepient { get; set; }

        public Guid Initiator { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }

        public bool IsRead { get; set; }

        public DateTime DateSent { get; set; }
    }
}
