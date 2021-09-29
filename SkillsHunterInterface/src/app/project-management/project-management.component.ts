import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { createProjectRequest } from '../classes/project';
import { CreateProjectComponent } from './create-project/create-project.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  panelOpenState = false; //For the project expansion pannel

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateProjectDialog(): void {
    //this.newProject;
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      backdropClass: 'create-project-dialog'
      //width: '250px',
     //data: {newProject:this.newProject}
     //data: this.newProject
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
     // console.log(result);
      //this.newProject = result;
    });
  }


}
