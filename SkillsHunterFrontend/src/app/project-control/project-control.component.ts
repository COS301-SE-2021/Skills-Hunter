import { Component, OnInit } from '@angular/core';
import { getProjectsResponse } from '../api-message-class/message';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectAdvancedSearchComponent } from './project-advanced-search/project-advanced-search.component'
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-project-control',
  templateUrl: './project-control.component.html',
  styleUrls: ['./project-control.component.scss']
})
export class ProjectControlComponent implements OnInit {
  data:getProjectsResponse[] = [];
  searchTerm:string = "";

  constructor(public dialog: MatDialog,private adminService: AdminService) { }

  ngOnInit(): void {
  }

  viewAll(): void {
    this.adminService.getProjects().subscribe(result =>{
      console.log(result)
      this.data = result;
      this.ngOnInit(); 
    })
       
  }

  advancedSearch(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '30%';
    configDialog.height = '40%';
    configDialog.data = '#';
    const dialogRef = this.dialog.open(ProjectAdvancedSearchComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {       
      this.adminService.getProjects().subscribe(response =>{
        this.data = response;
        let newList: getProjectsResponse[] = new Array();
        let value:boolean;
        if(result == undefined){
          return;
        }

        value = result;

        for(let count = 0; count < this.data.length; count++){
          
          if(this.data[count].openForApplication == value)
            newList.push(this.data[count]);
        }

        this.data = newList;
        this.ngOnInit();
      })
    });
  }

  Search(): void{
    if(this.searchTerm != ""){
      this.adminService.getProjects().subscribe(response =>{
        let tempData:getProjectsResponse[] = response;
        let result: getProjectsResponse = null;
        
        for(let count  = 0; count < tempData.length; count++){
          if(tempData[count].name == this.searchTerm){
            result = tempData[count];
            break;
          }
        }
  
        if(result != null){
          this.data = [];
          this.data.push(result);
          this.ngOnInit();
        }else{
          this.data = [];
          this.ngOnInit();
        }
   
      })
    }   
  }
}
