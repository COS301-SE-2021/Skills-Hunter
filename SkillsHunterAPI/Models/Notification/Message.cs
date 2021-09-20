using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Notification
{
    public class Message
    {
        public string MessageContent { get; set; }

        public bool IsRead { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;
    }
}
