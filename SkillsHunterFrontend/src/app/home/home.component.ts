import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CreateprojectComponent } from './../createproject/createproject.component';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  //this function will open a popup with fields for collecting project info
  create(){
    const configDialog=new MatDialogConfig();
    configDialog.backdropClass="backGround";
    // configDialog.width='700px';
    // configDialog.height='400px';
    this.dialog.open(CreateprojectComponent ,configDialog);
  }
}
