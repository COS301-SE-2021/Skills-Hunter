import { Component, OnInit,Input } from '@angular/core';
import { project } from '../../classes/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() _project:project= {projectName:'',description:'',industry:'',skill:'',openForApllication:false};
  
  constructor() { 
  }

  ngOnInit(): void {
  }

}
