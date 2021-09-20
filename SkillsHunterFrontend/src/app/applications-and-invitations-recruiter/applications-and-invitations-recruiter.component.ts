import { Component, OnInit } from '@angular/core';
import { ProjectCRUDService } from '../services/project-crud.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-applications-and-invitations-recruiter',
  templateUrl: './applications-and-invitations-recruiter.component.html',
  styleUrls: ['./applications-and-invitations-recruiter.component.scss'],
})
export class ApplicationsAndInvitationsRecruiterComponent implements OnInit {
  constructor(private projectCrud: ProjectCRUDService) {}

  arrRecruiterInvitationsReceived = [];
  arrRecruiterApplicationsSent = [];

  selected_project = 'a62d3f98-d227-452c-0b46-08d97c0cc7a2';

  ngOnInit(): void {
    this.projectCrud
      .getApplicationsForProject(this.selected_project)
      .subscribe((data) => {
        console.log(data);
        this.arrRecruiterApplicationsSent = data;
      });

    this.projectCrud
      .getInvitationsForProject(this.selected_project)
      .subscribe((data) => {
        console.log(data);
        this.arrRecruiterInvitationsReceived = data;
      });
  }

  displayedColumnsApplications: string[] = [
    'application_date',
    'application_message',
    'application_response',
  ];
  dataSourceApplications = new MatTableDataSource(
    this.arrRecruiterApplicationsSent
  );

  displayedColumnsInvitations: string[] = [
    'invitation_date',
    'invitation_message',
    'invitation_response',
  ];
  dataSourceInvitations = new MatTableDataSource(
    this.arrRecruiterInvitationsReceived
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
