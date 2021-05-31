import { Component, OnInit } from '@angular/core';
import { Project } from './Project';
import { Projects } from './mock-projects';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title :string = 'Projects';
   _projects:Project[] = Projects;
   
  constructor() { }

  ngOnInit(): void {
  }

}
