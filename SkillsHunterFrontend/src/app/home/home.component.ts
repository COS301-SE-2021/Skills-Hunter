import { Component, OnInit } from '@angular/core';
import { Project } from './Project';
import { Projects } from './mock-projects';
import { Router } from '@angular/router';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CreateprojectComponent } from './../createproject/createproject.component';
import { ProjectCRUDService } from '../services/project-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title :string = 'Projects';
   _projects:Project[] = Projects;
   
  constructor(private _router: Router,private dialog:MatDialog,private projectService:ProjectCRUDService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => (this._projects = projects));
  }

  create(){
    const configDialog=new MatDialogConfig();
    configDialog.backdropClass="backGround";
    configDialog.width='40%';
    configDialog.height='80%';
    this.dialog.open(CreateprojectComponent ,configDialog);
  }
}
