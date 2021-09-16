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

  ngOnInit(): void {
    document.getElementById('tool').style.display = 'block';
    document.getElementById('side').style.display = 'block';
    document.getElementById('adminlist').style.display = 'none';
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
