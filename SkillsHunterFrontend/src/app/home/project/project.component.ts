import { Component, OnInit,Input } from '@angular/core';
import { Project } from '../Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

	// id: number;
	// name: string;
	// description: string;
	// industry: string;
	// owner: string;
	// location: string;
	// skills: string[];
	// openForApplication: boolean;

export class ProjectComponent implements OnInit {
  @Input() _project:Project= {id:-1,name:'',description:'',industry:'',owner:'',location:'',skills:'',openForApplication:false};
  
  constructor() { 
  }

  ngOnInit(): void {
  }

}
