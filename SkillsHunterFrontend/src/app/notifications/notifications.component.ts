import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationResponseComponent } from './notification-response/notification-response.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface NotificationItem {
  subject: string;
  id: number;
  type: string;
  message: string;
}

const NOTIFICATION_DATA: NotificationItem[] = [
  {
    id: 1,
    subject: 'New Candidate Found!',
    type: 'Recruitment',
    message: 'We have found (1) candidate(s) for Project C ...',
  },
  {
    id: 2,
    subject: 'Project X - Application Accepted',
    type: 'Application',
    message: 'Welcome aboard! Pending interview and ...',
  },
  {
    id: 3,
    subject: 'Password Change',
    type: 'Profile',
    message: 'Your password has to be changed by 20/11/2022',
  },
  {
    id: 4,
    subject: 'Project Y - Application Under Review',
    type: 'Application',
    message: 'Please be patient as we review your Application.',
  },
  {
    id: 5,
    subject: 'No Candidates Found!',
    type: 'Recruitment',
    message: 'The project required skills are rare and the system ...',
  },
  {
    id: 6,
    subject: 'Project Z - Application Rejected',
    type: 'Application',
    message: 'It is with regret that we notify you of ...',
  },
  {
    id: 7,
    subject: 'New Candidate Found!',
    type: 'Recruitment',
    message: 'We have found (2) candidate(s) for Project C ...',
  },
  {
    id: 8,
    subject: 'Project A - Failed to Find Candidates',
    type: 'Recruitment',
    message:
      'Failed to Find Candidates. We will continue searching for candidates.',
  },
  {
    id: 9,
    subject: 'Project B - Failed to Find Candidates',
    type: 'Recruitment',
    message:
      'Failed to Find Candidates. We will continue searching for candidates.',
  },
  {
    id: 10,
    subject: 'Project U - Application Rejected',
    type: 'Application',
    message: 'It is with regret that we notify you of ...',
  },
];

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  columnsToDisplay = ['id', 'type', 'subject'];
  expandedElement: NotificationItem | null;
  dataSource = NOTIFICATION_DATA;
  constructor(private dialog: MatDialog) {}

  respondToNotification(selectedNotification) {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '45%';
    configDialog.height = '400px';
    configDialog.data = selectedNotification;

    const dialogRef = this.dialog.open(
      NotificationResponseComponent,
      configDialog
    );

    dialogRef.afterClosed().subscribe((response) => {
      console.log('We got back the reponse!');
      console.log(response);
    });
  }

  ngOnInit(): void {}
}
