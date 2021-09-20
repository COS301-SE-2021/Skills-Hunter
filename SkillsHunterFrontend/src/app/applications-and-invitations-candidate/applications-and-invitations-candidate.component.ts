import { Component, OnInit } from '@angular/core';
import { ProjectCRUDService } from '../services/project-crud.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-applications-and-invitations-candidate',
  templateUrl: './applications-and-invitations-candidate.component.html',
  styleUrls: ['./applications-and-invitations-candidate.component.scss'],
})
export class ApplicationsAndInvitationsCandidateComponent implements OnInit {
  constructor(private projectCrud: ProjectCRUDService) {}

  arrUserInvitationsReceived = [];
  arrUserApplicationsSent = [];

  ngOnInit(): void {
    this.projectCrud.getUserApplications().subscribe((data) => {
      console.log(data);
      this.arrUserApplicationsSent = data;
    });

    this.projectCrud.getUserInvitations().subscribe((data) => {
      console.log(data);
      this.arrUserInvitationsReceived = data;
    });
  }

  displayedColumnsApplications: string[] = [
    'application_date',
    'application_message',
    'application_response',
  ];
  dataSourceApplications = new MatTableDataSource(this.arrUserApplicationsSent);

  displayedColumnsInvitations: string[] = [
    'invitation_date',
    'invitation_message',
    'invitation_response',
  ];
  dataSourceInvitations = new MatTableDataSource(
    this.arrUserInvitationsReceived
  );

  applyFilterApplications(filterValue: string) {
    this.dataSourceApplications.filter = filterValue.trim().toLowerCase();
  }

  applyFilterInvitations(filterValue: string) {
    this.dataSourceApplications.filter = filterValue.trim().toLowerCase();
  }

  showInvitation(element: any) {
    console.log(element);
  }

  showApplication(element: any) {
    console.log(element);
  }
}
