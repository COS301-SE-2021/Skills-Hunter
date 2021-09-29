﻿using System;
using MediatR;

namespace SkillsHunterAPI.Commands.Project
{
    public class inviteCandidateCommand : IRequest<bool>
    {
        public Guid UserId { get; }
        public Guid ProjectId { get; }
        public Guid InviteeId { get; }
        public string Message { get; }

        public inviteCandidateCommand(Guid user, Guid project, Guid invitee, string mes)
        {
            UserId = user;
            ProjectId = project;
            InviteeId = invitee;
            Message = mes;
        }
    }
}
