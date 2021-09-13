import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../Project';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  panelOpenState: boolean = false;
  @Input() _project = {
    id: -1,
    name: '',
    description: '',
    industry: '',
    owner: '',
    location: '',
    skills: [''],
    openForApplication: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
