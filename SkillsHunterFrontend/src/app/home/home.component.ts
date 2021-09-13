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

export const theProject = [
  {
    projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Project X',
    description: 'Description of the project',
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
      skillCollections: [
        // {
        //   "projectSkillCollectionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //   "name": "string",
        //   "description": "string",
        //   "weight": 0,
        //   "skills": [
        //     {
        //       "projectSkillId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //       "skillId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //       "name": "string",
        //       "weight": 0
        //     }
        //   ]
        // }
      ],
    },
  },
];

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
      this._projects = theProject;
      // this.projectCrud.getProjectsByProjectOwnerId().subscribe((data) => {
      //   // this._projects = data;
      //   this._projects = this.theProject;
      //   console.log('Response post', data);
      // });
    } else {
      document.getElementById('creatediv').style.display = 'none';
      this._projects = theProject;

      // this.projectCrud.getAllProjects().subscribe((data) => {
      //   console.log(data);
      //   // this._projects = data;
      //   this._projects = this.theProject;
      //   console.log('Response post', data);
      // });
    }
  }

  create() {
    this._router.navigate([`createproject`]);
  }

  update() {
    this._router.navigate([`update-project`]);
  }
}
