using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Notification
{
    public class Message
    {
        public string message { get; set; }

        public bool isRead { get; set; }

        public DateTime created { get; set; } = DateTime.Now;
    }
}
