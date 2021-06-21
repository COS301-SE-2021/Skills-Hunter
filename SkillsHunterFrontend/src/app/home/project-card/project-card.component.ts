import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from 'src/app/classes/Project';
import { Projects } from 'src/app/mock-data/mock-projects';
import { ProjectCRUDService } from 'src/app/services/project-crud.service';
import { projectService } from 'src/app/services/project-edit.service';
import { UpdateProjectComponent } from 'src/app/update-project/update-project.component';
import { Apply } from 'src/app/classes/Apply';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  panelOpenState: boolean = false;

  @Input() card_project: Project;

  constructor(
    private dialog: MatDialog,
    private projectData: projectService,
    private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {

    if(localStorage.getItem('role')=='Candidate'){

      document.documentElement.style.setProperty('--visFind', 'none');
      document.documentElement.style.setProperty('--visUpdate', 'none');
      document.documentElement.style.setProperty('--visDelete', 'none');
      document.documentElement.style.setProperty('--visCancel', 'none');
      document.getElementById("createbtn").style.visibility = "hidden";
    }
    else if(localStorage.getItem('role')=='Admin'){
      document.documentElement.style.setProperty('--visFind', 'none');
      document.documentElement.style.setProperty('--visUpdate', 'none');
      document.documentElement.style.setProperty('--visAppl', 'none');
      document.documentElement.style.setProperty('--visCancel', 'none');
      document.getElementById("createbtn").style.visibility = "hidden";

    }
    else{
      document.documentElement.style.setProperty('--visAppl', 'none');
      document.documentElement.style.setProperty('--visCancel', 'none');
    }
    

  }

  get getProjectInfo(): Project {
    return this.projectData.projectBeingedited;
  }
  //this sets project service which holds the data which will be displayed in the update dialog
  set setProjectInfo(project: Project) {
    this.projectData.projectBeingedited = project;
  }

  update(_project: Project) {
    this.setProjectInfo = _project;
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '80%';
    this.dialog.open(UpdateProjectComponent, configDialog);
  }

  delete(_project: Project) {
    if (confirm(`Are you sure to delete ${_project.Name}`)) {
      for (let [i, proj] of Projects.entries()) {
        if (proj.ProjectId == _project.ProjectId) {
          Projects.splice(i, 1);
        }
      }

      //the service is called below
        this.projectCrud
         .deleteProject(_project.ProjectId) //change so it calls update
         .subscribe((data) => {
           console.log('Response post', data);
         });
    }
  }

  apply(_project: Project){

    console.log(_project.ProjectId);
    var formData = new Apply();
    formData.UserId=localStorage.getItem('userID');
    formData.ProjectId="3fa85f64-5717-4562-b3fc-2c963f66afa4"//_project.ProjectId;


     //the service is called below;
       this.projectCrud
         .apply(formData) //change so it calls update
         .subscribe((data) => {
           console.log('Response post', data);
         });
  }
}
