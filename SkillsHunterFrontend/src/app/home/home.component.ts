import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectCRUDService } from '../services/project-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = 'Projects';
  filterQuery: string = '';
  _projects = [];

  constructor(
    private _router: Router,
    private projectCrud: ProjectCRUDService
  ) {}

  // //this function sets(assigns) the project data from the 'projectService'
  // set retData(_project:project)
  // {
  //   this.projectData.projectBeingedited = _project;
  // }
  userType: number = -1;
  ngOnInit(): void {
    if (localStorage.getItem('rememberMe') !== null) {
      if (localStorage.getItem('rememberMe') == 'true') {
        this.userType = parseInt(localStorage.getItem('role'));
      } else {
        this.userType = parseInt(sessionStorage.getItem('role'));
      }
    }

    // document.getElementById('tool').style.display = 'block';
    // document.getElementById('side').style.display = 'block';
    // document.getElementById('adminlist').style.display = 'none';
    // document.getElementById('houseAdmin').style.display = 'none';

    //read data of projects:
    if (localStorage.getItem('role') == '1') {
      console.log('Getting projects by owner ID');

      this.projectCrud.getProjectsByProjectOwnerId().subscribe((data) => {
        console.log(data);
        this._projects = data;
      });
    } else {
      document.getElementById('createbtn').style.display = 'none';

      console.log('Getting all Projects');

      this.projectCrud.getAllProjects().subscribe((data) => {
        console.log(data);
        this._projects = data;
      });
    }
  }

  create() {
    this._router.navigate([`createproject`]);
  }
}
