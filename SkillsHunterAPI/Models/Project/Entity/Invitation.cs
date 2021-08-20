using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models.Project
{
    //This Model entity class contains data about the invitation of a candidate to a project by a Project owner
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
