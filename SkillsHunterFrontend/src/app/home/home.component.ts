import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';

import { Projects } from '../mock-data/mock-projects';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateprojectComponent } from './../createproject/createproject.component';
import { projectService } from '../services/project-edit.service';
import { Project } from '../classes/Project';
import { ProjectCRUDService } from '../services/project-crud.service';
import { MaterialModule } from '../material/material.module';
import { AdminPortalComponent } from '../admin-portal/admin-portal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = 'Projects';
  filterQuery: string = '';
  _projects = []; //= Projects;

  constructor(
    private _router: Router,
    private dialog: MatDialog,
    private projectCrud: ProjectCRUDService,
    private adminCrud: AdminService,
    private projectData: projectService
  ) {}

  // //this function sets(assigns) the project data from the 'projectService'
  // set retData(_project:project)
  // {
  //   this.projectData.projectBeingedited = _project;
  // }

  ngOnInit(): void {
    document.getElementById('tool').style.display = 'block';
    document.getElementById('side').style.display = 'block';
    document.getElementById('adminlist').style.display = 'none';
    // document.getElementById('houseAdmin').style.display = 'none';

    //read data of projects
    var functiontoCall;
    if (localStorage.getItem('role') == '1') {
      console.log('Getting projects by owner ID');

      this.projectCrud.getProjectsByProjectOwnerId().subscribe((data) => {
        console.log(data);
        this._projects = data;
        console.log('Response post', data);
      });
    } else {
      document.getElementById('createbtn').style.display = 'none';

      console.log('Getting all Projects');

      this.projectCrud.getAllProjects().subscribe((data) => {
        console.log(data);
        this._projects = data;
        console.log('Response post', data);
      });
    }
  }

  create() {
    this._router.navigate([`createproject`]);
  }
}

export const theProject = [
  {
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Project A',
    description: 'We will now describe the project A',
    owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    location: 'Johannesburg',
    openForApplication: true,
    dateCreated: '2021-09-13T08:08:09.677Z',
    projectSkills: {
      skills: [
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'C++',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
          name: 'Python',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
          name: 'Java',
          weight: 5,
        },
      ],
      skillCollections: [],
    },
  },
  {
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Skills Hunter',
    description: 'Description of the project Skills Hunter',
    owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    location: 'Hatfield',
    openForApplication: true,
    dateCreated: '2021-09-13T08:08:09.677Z',
    projectSkills: {
      skills: [
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Pascal',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
          name: 'Java',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
          name: 'SQL',
          weight: 5,
        },
      ],
      skillCollections: [],
    },
  },
  {
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'House Seeker',
    description: 'Help busy workerholics find their dream home',
    owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    location: 'North West',
    openForApplication: true,
    dateCreated: '2021-09-13T08:08:09.677Z',
    projectSkills: {
      skills: [
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'C#',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
          name: 'Borland-Delphi Pascal',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
          name: 'Java',
          weight: 5,
        },
      ],
      skillCollections: [],
    },
  },
  {
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Recipe App',
    description: 'Develop a cook book',
    owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    location: 'Durban',
    openForApplication: true,
    dateCreated: '2021-09-13T08:08:09.677Z',
    projectSkills: {
      skills: [
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Go',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
          name: 'Scala',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
          name: 'Kotlin',
          weight: 5,
        },
      ],
      skillCollections: [],
    },
  },
  {
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Flight Simulator',
    description: 'Develop a flight simulation game',
    owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    location: 'Cape Town',
    openForApplication: true,
    dateCreated: '2021-09-13T08:08:09.677Z',
    projectSkills: {
      skills: [
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Python',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
          name: 'OpenGL',
          weight: 5,
        },
        {
          projectSkillId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          skillId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
          name: 'C++',
          weight: 5,
        },
      ],
      skillCollections: [],
    },
  },
];
