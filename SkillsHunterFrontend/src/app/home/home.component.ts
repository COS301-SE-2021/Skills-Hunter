import { Component, OnInit } from '@angular/core';
import { Projects } from '../mock-data/mock-projects';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateprojectComponent } from './../createproject/createproject.component';
import { projectService } from '../services/project-edit.service';
import { Project } from '../classes/Project';
import { ProjectCRUDService } from '../services/project-crud.service';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = 'Projects';
  filterQuery: string = '';
  _projects: Project[] = Projects;

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
    //read data of projects
    var functiontoCall;
    if (localStorage.getItem('role') == '1') {
      this.projectCrud.getProjectsByProjectOwnerId().subscribe((data) => {
        this._projects = data;
        console.log('Response post', data);
      });
    } else {
      this.projectCrud.getProjects().subscribe((data) => {
        this._projects = data;
        console.log('Response post', data);
      });
    }
  }

  create() {
    this._router.navigate([`createproject`]);
    // const configDialog = new MatDialogConfig();
    // configDialog.backdropClass = 'backGround';
    // configDialog.width = '800px';
    // configDialog.height = '800px';
    // this.dialog.open(CreateprojectComponent, configDialog);
  }
}
