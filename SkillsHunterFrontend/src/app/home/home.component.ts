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
      console.log('\n\n RECRUITER, HERE! \n\n');
      this.projectCrud.getProjectsByProjectOwnerId().subscribe((data) => {
        this._projects = data;
        console.log('Response post', data);
      });
    } else {
      document.getElementById('creatediv').style.display = 'none';
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

  update() {
    this._router.navigate([`update-project`]);
  }
}
