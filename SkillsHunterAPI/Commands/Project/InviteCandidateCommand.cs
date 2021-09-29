using System;
using MediatR;

namespace SkillsHunterAPI.Commands.Project
{
    public class InviteCandidateCommand: IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid InviteeId { get; set; }
        public string Message { get; set; }

        public InviteCandidateCommand(Guid user, Guid proj, Guid inv, string msg)
        {
            UserId = user;
            ProjectId = proj;
            InviteeId = inv;
            Message = msg;
        }
    }
}
