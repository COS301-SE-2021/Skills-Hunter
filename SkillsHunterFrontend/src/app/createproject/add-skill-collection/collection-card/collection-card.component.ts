import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Collection } from 'src/app/classes/Collection';
import { ProjectCRUDService } from 'src/app/services/project-crud.service';
import { projectService } from 'src/app/services/project-edit.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {

  @Input() card_collection: Collection;

  constructor(
    // private dialog: MatDialog,
    // private projectData: projectService,
    // private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {
  }

}
