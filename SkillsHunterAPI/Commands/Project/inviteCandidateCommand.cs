using System;
using MediatR;

namespace SkillsHunterAPI.Commands.Project
{
    public class InviteCandidateCommand : IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid InviteeId { get; set; }
        public string Message { get; set; }

        public InviteCandidateCommand(Guid user, Guid project, Guid invitee, string mes)
        {
            UserId = user;
            ProjectId = project;
            InviteeId = invitee;
            Message = mes;
        }
    }
}
