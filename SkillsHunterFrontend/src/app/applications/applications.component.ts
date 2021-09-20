import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectCRUDService } from '../services/project-crud.service';

// export interface Invitation  {
//   invitationId: string,
//   inviteeId: string,
//   inviterId: string,
//   projectId: string,
//   message: 'string',
//   inviteDate: string,
//   status: number,
// },

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  constructor(private projectCrud: ProjectCRUDService) {}

  selected_project = 'a62d3f98-d227-452c-0b46-08d97c0cc7a2';

  ngOnInit(): void {
    this.projectCrud
      .getApplicationsForProject(this.selected_project)
      .subscribe((data) => {
        console.log(data);
      });

    this.projectCrud
      .getInvitationsForProject(this.selected_project)
      .subscribe((data) => {
        console.log(data);
      });
  }

  displayedColumns: string[] = ['invitation_date', 'invitation_message'];
  dataSource = new MatTableDataSource(invitations);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showInvitation(element: any) {
    console.log(element);
  }

  candidatesList = theCandidate;
}

var invitations = [
  {
    invitationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviteeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    message: 'Hello',
    inviteDate: '2021-09-17T15:30:08.693Z',
    status: 0,
  },
  {
    invitationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviteeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    message: 'Welcome',
    inviteDate: '2021-09-15T15:30:08.693Z',
    status: 0,
  },
  {
    invitationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviteeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    message: 'Nicely done.',
    inviteDate: '2021-09-10T15:30:08.693Z',
    status: 0,
  },
  {
    invitationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviteeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    inviterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    message: 'Hey',
    inviteDate: '2021-09-09T15:30:08.693Z',
    status: 0,
  },
];

var theCandidate = [
  {
    percentage: 50,
    userId: 'b3d3e53a-f875-441f-d757-08d9786a3e36',
    name: 'Candidate',
    surname: 'One',
    email: 'candidate1@gmail.com',
    matchingSkills: [
      {
        skillId: '0267ff11-f774-4d9b-643c-08d9787120f0',
        name: 'Java',
        weight: 5,
        percentage: 40,
        yearsOfExperience: 1,
      },
      {
        skillId: '0267ff11-f774-4d9b-643c-08d9787120f0',
        name: 'C++',
        weight: 5,
        percentage: 40,
        yearsOfExperience: 1,
      },
    ],
  },
  {
    percentage: 80,
    userId: 'b3e9e7eb-e355-4f24-d758-08d9786a3e36',
    name: 'Candidate',
    surname: 'Two',
    email: 'candidate2@gmail.com',
    matchingSkills: [
      {
        skillId: '0267ff11-f774-4d9b-643c-08d9787120f0',
        name: 'C++',
        weight: 8,
        percentage: 40,
        yearsOfExperience: 1,
      },
    ],
  },
  {
    percentage: 70,
    userId: '742ab9db-35ec-4f92-d759-08d9786a3e36',
    name: 'Candidate',
    surname: 'Three',
    email: 'candidate3@gmail.com',
    matchingSkills: [
      {
        skillId: 'ebe1738e-c37b-4808-643d-08d9787120f0',
        name: 'Java',
        weight: 7,
        percentage: 45,
        yearsOfExperience: 1,
      },
    ],
  },
];
