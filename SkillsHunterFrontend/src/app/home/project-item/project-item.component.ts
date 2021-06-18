import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { project } from '../../classes/project';
import { projectService } from '../../services/project-edit.service';
import { ProjectCRUDService } from '../../services/project-crud.service';
import { UpdateProjectComponent } from 'src/app/update-project/update-project.component';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  panelOpenState: boolean = false;
  @Input() _project: project = {
    Id: -1,
    Name: '',
    Description: '',
    Industry: '',
    Owner: '',
    Location: '',
    Skill: [],
    OpenForApplication: false,
  };

  constructor(
    private dialog: MatDialog,
    private projectData: projectService,
    private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {}

  get getProjectInfo(): project {
    return this.projectData.projectBeingedited;
  }
  //this sets project service which holds the data which will be displayed in the update dialog
  set setProjectInfo(project: project) {
    this.projectData.projectBeingedited = project;
  }

  update(project) {
    this.setProjectInfo = project;
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '80%';
    this.dialog.open(UpdateProjectComponent, configDialog);
  }
  delete(project) {
    if (confirm(`Are you sure to delete ${project.Name}`)) {
      document.getElementById(project.Id).style.display = 'none';

      //the service is called below
      this.projectCrud
        .createProject(project) //change so it calls update
        .subscribe((data) => {
          console.log('Response post', data);
        });
    }
  }
}
