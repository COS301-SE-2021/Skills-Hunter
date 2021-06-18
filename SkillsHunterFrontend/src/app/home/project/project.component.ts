import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../classes/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() _project: Project = {
    id: -1,
    Name: '',
    Description: '',
    Owner: '',
    Location: '',
    Skill: [],
    OpenForApplication: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
