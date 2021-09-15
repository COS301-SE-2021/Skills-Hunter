using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Notification
{
    public class Notification
    {
        public Guid NotificationId { get; set; }

        public Guid RecepientId { get; set; }

        public Guid InitiatorId{ get; set; }

        public string Subject { get; set; }
        
        public string Message { get; set; }

        public bool IsRead { get; set; } = false;

        public DateTime DateSent { get; set; } = DateTime.Now;

       
    }
}
