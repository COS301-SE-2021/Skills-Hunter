import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../classes/Project';
@Component({
  selector: 'app-admin-project-card',
  templateUrl: './admin-project-card.component.html',
  styleUrls: ['./admin-project-card.component.scss']
})
export class AdminProjectCardComponent implements OnInit {
  @Input() project:Project;
  constructor() { }

  ngOnInit(): void {
  }

}
