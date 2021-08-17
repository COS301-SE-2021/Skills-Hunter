import { Component, OnInit, Inject } from '@angular/core';
import { Projects } from 'src/app/mock-data/mock-projects';
import { Project } from 'src/app/classes/Project';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-skill-collection-advanced-search',
  templateUrl: './skill-collection-advanced-search.component.html',
  styleUrls: ['./skill-collection-advanced-search.component.scss']
})
export class SkillCollectionAdvancedSearchComponent implements OnInit {
  ProjectData:Project[] = Projects;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
