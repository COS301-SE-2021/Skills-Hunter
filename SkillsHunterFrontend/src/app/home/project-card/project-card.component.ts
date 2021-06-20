import { Projects } from './../mock-projects';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from 'src/app/classes/Project';
import { ProjectCRUDService } from 'src/app/services/project-crud.service';
import { projectService } from 'src/app/services/project-edit.service';
import { UpdateProjectComponent } from 'src/app/update-project/update-project.component';

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

  ngOnInit(): void {}

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
        if (proj.id == _project.id) {
          Projects.splice(i, 1);
        }
      }

      //the service is called below
      // this.projectCrud
      //   .createProject(_project) //change so it calls update
      //   .subscribe((data) => {
      //     console.log('Response post', data);
      //   });
    }
  }
}
