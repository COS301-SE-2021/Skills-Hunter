import { Component, OnInit,Input } from '@angular/core';
import { UpdateprojectComponent } from './../../updateproject/updateproject.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Project} from '../Project';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  panelOpenState :boolean = false;
  @Input() _project:Project = {id:-1,name:'',description:'',industry:'',owner:'',location:'',skills:'',openForApplication:false};

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  update(){
    const configDialog=new MatDialogConfig();
    configDialog.backdropClass="backGround";
    configDialog.width='40%';
    configDialog.height='80%';
    this.dialog.open(UpdateprojectComponent ,configDialog);
  }
}
