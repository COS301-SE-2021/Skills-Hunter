import { Component, OnInit} from '@angular/core';
import { UserAdvancedSearchComponent } from './user-advanced-search/user-advanced-search.component';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';

import { User } from '../classes/User';

import {MatSidenav} from '@angular/material/sidenav';


import { mockUserData } from '../mock-data/mock-users';

import { getUserResponse } from '../api-message-class/message';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent implements OnInit {

  data: getUserResponse[] = [];
  searchTerm: string = "";
  
  constructor(public dialog: MatDialog,private adminService:AdminService) { }


  ngOnInit(): void {
    document.getElementById('tool').style.display = "block";
    document.getElementById('side').style.display = "block";
    document.getElementById('userlist').style.display = "none"; 
    document.getElementById('house').style.display = "none";
  }

  advancedSearch(): void {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '30%';
    configDialog.height = '50%';
    configDialog.data = -1;

    const dialogRef = this.dialog.open(UserAdvancedSearchComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.adminService.getUsers().subscribe(response =>{
        this.data = response;
        let newList: getUserResponse[] = new Array();
        
        if(result == -1){
          return;
        }

        for(let count = 0; count < this.data.length; count++){
          
          if(this.data[count].userType == result)
            newList.push(this.data[count]);
        }

        
  
        this.data = newList;
        this.ngOnInit();
      },
      error=>{
        this.data = mockUserData;
        let newList: getUserResponse[] = new Array();
  
        if(result == -1)
          return;
  

        for(let count = 0; count < this.data.length; count++){
          if(this.data[count].userType == result)
            newList.push(this.data[count]);
        }
  
        this.data = newList;
        this.ngOnInit();        
      });
    });
  }

  viewAll(): void{
    this.adminService.getUsers().subscribe(result =>{
        this.data = result;
        this.ngOnInit();
    },
    error=>{
        this.data = mockUserData;
        this.ngOnInit();
    });
    
  }

  deleteUser(user: getUserResponse): void{
    for(var count = 0; count < this.data.length;count++){
      if(this.data[count].userId == user.userId){
        for(var step = count; step < this.data.length - 1; step++){
          this.data[step] = this.data[step + 1];
        }
        this.data.pop();
        break;
      }
    }

    this.ngOnInit();
  }

  Search(): void{

    if(this.searchTerm != ""){

      this.adminService.getUsers().subscribe(response =>{
        let tempData:getUserResponse[] = response;
        let result: getUserResponse = null;
        
        for(let count  = 0; count < tempData.length; count++){
          if(tempData[count].name.toLowerCase() == this.searchTerm.toLowerCase()){
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
      },
      error=>{
        let tempData:getUserResponse[] = mockUserData;
        let result: getUserResponse = null;
        
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
      });     
    }
  }

}
