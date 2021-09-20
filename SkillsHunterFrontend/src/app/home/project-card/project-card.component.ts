import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  @Input() card_project: any;

  constructor(
    private dialog: MatDialog,
    private projectData: projectService,
    private projectCrud: ProjectCRUDService,
    private _snackBar: MatSnackBar,
    private _router: Router
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

  update(_project) {
    console.log('About to update!!');
    console.log(_project);
    const configDialog = new MatDialogConfig();
    configDialog.panelClass = 'custom-modalbox';
    configDialog.data = _project;
    this.dialog.open(UpdateProjectComponent, configDialog);
  }

  delete(_project) {
    console.log('About to delete');
    console.log(_project);

    var formData = {
      projectId: _project.projectId,
    };

    if (confirm(`Are you sure you want to delete ${_project.name}?`)) {
      this.projectCrud.deleteProject(formData).subscribe((data) => {
        console.log('Response post', data);
      });
      window.location.reload();
      // this._router.navigate([`home`]);
    }
  }

  apply(_project) {
    console.log('\nApplying for Project\n');

    this.projectCrud.getMyUserID().subscribe((userID) => {
      var formData = {
        userId: userID,
        projectId: _project.projectId,
      };

      // the service is called below;
      this.projectCrud.applyForProject(formData).subscribe((data) => {
        console.log('Response post', data);

        if (data.success == true)
          this._snackBar.open('Successfully Applied for Project!', '', {
            duration: 3000,
          });
        else {
          this._snackBar.open('Project Application Failed. You have already applied', '', {
            duration: 3000,
          });
        }
      });
    });

    this.cancel();
  }

  match(_project: any) {
    this._router.navigate(['match-candidate', _project]);
  }

  cancel() {
    this.dialog.closeAll();
  }
}
