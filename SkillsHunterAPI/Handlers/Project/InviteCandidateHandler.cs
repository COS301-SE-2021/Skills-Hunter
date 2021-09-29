using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsHunterAPI.Commands.Project;
using SkillsHunterAPI.Models.Notification;
using SkillsHunterAPI.Services;
using SkillsHunterAPI.Services.Interface;

namespace SkillsHunterAPI.Handlers.Project
{
    public class InviteCandidateHandler: ProjectHandler, IRequestHandler<InviteCandidateCommand, bool>
    {
        protected readonly INotificationService _notificationService;

        public InviteCandidateHandler(IProjectService projectService, INotificationService notificationService) : base(projectService)
        {
            _notificationService = notificationService;
        }

        async Task<bool> IRequestHandler<InviteCandidateCommand, bool>.Handle(InviteCandidateCommand request, CancellationToken cancellationToken)
        {
            var InviteStatus = await _projectService.InviteCandidate(request.UserId, request.ProjectId, request.InviteeId, request.Message);

            if (InviteStatus == true)
            {
                var Subject = "Project Invitation";

                Notification newNotification = new Notification();
                newNotification.InitiatorId = request.UserId;
                newNotification.RecepientId = request.InviteeId;
                newNotification.Subject = Subject;
                newNotification.Message = request.Message;
                newNotification.IsRead = false;
                newNotification.DateSent = DateTime.Now;

                Notification notification = await _notificationService.SendNotifications(newNotification);

            }

            return InviteStatus;
        }
    }
}
