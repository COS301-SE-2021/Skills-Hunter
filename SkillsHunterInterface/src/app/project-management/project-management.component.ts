import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createProjectRequest, project } from '../classes/project';
import { ProjectService } from '../services/project/project.service';
import { CreateProjectComponent } from './create-project/create-project.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  collectionPanelOpenState = false; //For the project expansion pannel
  projectPanelOpenState = false;

  constructor(public dialog: MatDialog, private projectService: ProjectService, private _router: Router) { }

  projects: project[];

  ngOnInit(): void {
    this.projectService.getProjectByOwnerId()
    .subscribe(
      data=>{ 
        this.projects = data;
        //console.log(this.projects);
      },
      err =>{
       
        if(err.status>=400 && err.status<500){
          console.log(err.status);
        }
       else
       {
         console.log('HTTP Error1', err);//server error
       }
      }
    );
  }


  openCreateProjectDialog(): void {
    //this.newProject;
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      backdropClass: 'create-project-dialog',
      height: '60%',
     //data: {newProject:this.newProject}
     //data: this.newProject
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
     // console.log(result);
      //this.newProject = result;
    });
  }

  onMatch(proj:string) {
    this._router.navigate(['matchCandidates', proj]); (1)
  }
  


}
