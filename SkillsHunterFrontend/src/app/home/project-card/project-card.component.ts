import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from 'src/app/classes/Project';
import { Projects } from 'src/app/mock-data/mock-projects';
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

  @Input() card_project;
  arrAllSkills = [];

  constructor(
    private dialog: MatDialog,
    private projectData: projectService,
    private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') == '0') {
      document.documentElement.style.setProperty('--visFind', 'none');
      document.documentElement.style.setProperty('--visUpdate', 'none');
      document.documentElement.style.setProperty('--visDelete', 'none');
      document.documentElement.style.setProperty('--visCancel', 'none');
      document.getElementById('createbtn').style.visibility = 'hidden';
    } else if (localStorage.getItem('role') == '3') {
      document.documentElement.style.setProperty('--visFind', 'none');
      document.documentElement.style.setProperty('--visUpdate', 'none');
      document.documentElement.style.setProperty('--visAppl', 'none');
      document.documentElement.style.setProperty('--visCancel', 'none');
      document.getElementById('createbtn').style.visibility = 'hidden';
    } else {
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

  update(_project) {
    console.log('About to update!!');
    console.log(_project);
    const configDialog = new MatDialogConfig();
    configDialog.panelClass = 'custom-modalbox';
    configDialog.data = _project;
    this.dialog.open(UpdateProjectComponent, configDialog);
  }

  delete(_project) {
    if (confirm(`Are you sure you want to delete ${_project.name}?`)) {
      this.projectCrud.deleteProject(_project.projectId).subscribe((data) => {
        console.log('Response post', data);
      });
      window.location.reload();
    }
  }

  apply(_project) {
    console.log('\nApplying for Project\n');

    this.projectCrud.getMyUserID().subscribe((userID) => {
      var formData = {
        userId: userID,
        projectId: _project.projectId,
      };

      console.log(formData);

      // the service is called below;
      this.projectCrud.applyForProject(formData).subscribe((data) => {
        console.log('Response post', data);
      });
    });

    this.cancel();
  }

  cancel() {
    this.dialog.closeAll();
  }
}
