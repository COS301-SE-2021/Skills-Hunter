import { Component, OnInit } from '@angular/core';
import { Project } from '../classes/Project';
import { Projects } from '../mock-data/mock-projects';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectAdvancedSearchComponent } from './project-advanced-search/project-advanced-search.component'

@Component({
  selector: 'app-project-control',
  templateUrl: './project-control.component.html',
  styleUrls: ['./project-control.component.scss']
})
export class ProjectControlComponent implements OnInit {
  data:Project[] = [];
  searchTerm:string = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  viewAll(): void {
    this.data = Projects;
    this.ngOnInit();    
  }

  advancedSearch(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '30%';
    configDialog.height = '40%';
    configDialog.data = '#';
    const dialogRef = this.dialog.open(ProjectAdvancedSearchComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {        
        this.data = Projects;
        let newList: Project[] = new Array();
        let value:boolean;
        if(result == undefined){
          return;
        }

        value = result;

        for(let count = 0; count < this.data.length; count++){
          
          if(this.data[count].OpenForApplication == value)
            newList.push(this.data[count]);
        }

        this.data = newList;
        this.ngOnInit();
    });
  }

  Search(): void{
    if(this.searchTerm != ""){
      let tempData:Project[] = Projects;
      let result: Project = null;
      
      for(let count  = 0; count < tempData.length; count++){
        if(tempData[count].Name == this.searchTerm){
          result = tempData[count];
          break;
        }
      }

      if(result != null){
        this.data = [];
        this.data.push(result);
        this.ngOnInit();
      }
    }   
  }
}
