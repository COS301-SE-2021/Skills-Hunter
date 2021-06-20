import { Component, OnInit,Input } from '@angular/core';
import { project } from '../../classes/project';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {
  @Input() _project:project = {
    Id:-1,
    Name:'',
    Description:'',
    Industry:'',
    Owner:'',
    Location:'',
    Skill:[] ,
    OpenForApplication:false};  
  
  constructor() { 
  }

  ngOnInit(): void {
    console.log("skill: "+ this._project.Skill);
  }

}
