using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Project
{
    public class Invitation
    {
        public Guid InvitationId { get; set; }
        public Guid InviteeId { get; set; }
        public Guid InviterId { get; set; }
        public Guid ProjectId { get; set; }
        public String Message { get; set; }
        public DateTime InviteDate { get; set; }
        
    }
}
