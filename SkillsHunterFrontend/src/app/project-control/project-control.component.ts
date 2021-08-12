import { Component, OnInit } from '@angular/core';
import { Project } from '../classes/Project';
import { Projects } from '../mock-data/mock-projects';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAdvancedSearchComponent } from './project-advanced-search/project-advanced-search.component'

@Component({
  selector: 'app-project-control',
  templateUrl: './project-control.component.html',
  styleUrls: ['./project-control.component.scss']
})
export class ProjectControlComponent implements OnInit {
  data:Project[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  viewAll(): void {
    this.data = Projects;
    this.ngOnInit();    
  }

  advancedSearch(): void{
    const dialogRef = this.dialog.open(ProjectAdvancedSearchComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.data = Projects;
      let newList: Project[] = new Array();
      let value:boolean;

      if(result == "true")
        value = true;
      else
        value = false;

      for(let count = 0; count < this.data.length; count++){
        
        if(this.data[count].OpenForApplication == value)
          newList.push(this.data[count]);
      }

      this.data = newList;
      this.ngOnInit();
    });
  }
}
