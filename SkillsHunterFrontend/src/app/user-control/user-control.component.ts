import { Component, OnInit } from '@angular/core';
import { UserAdvancedSearchComponent } from './user-advanced-search/user-advanced-search.component';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { User } from '../classes/User';
import { mockUserData } from '../mock-data/mock-Users';
import { DateAdapter } from '@angular/material/core';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent implements OnInit {
  data: User[] = [];
  searchTerm: string = "";
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  advancedSearch(): void {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '30%';
    configDialog.height = '50%';

    const dialogRef = this.dialog.open(UserAdvancedSearchComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.data = mockUserData;
      let newList: User[] = new Array();
      let index: number;

      if(result == "Candidate")
        index = 0;
      else if(result == "Project Owner")
        index = 1;
      else if(result == "Organisation")
        index = 2; 
      else if(result == "Admin")
        index = 3;

        console.log(index);
      for(let count = 0; count < this.data.length; count++){
        console.log(index);
        if(this.data[count].usertype == index)
          newList.push(this.data[count]);
      }

      this.data = newList;
      this.ngOnInit();
    });
  }

  viewAll(): void{
    this.data = mockUserData;
    this.ngOnInit();
  }

  deleteUser(user): void{
    for(var count = 0; count < this.data.length;count++){
      if(this.data[count].id == user.id){
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
      let tempData:User[] = mockUserData;
      let result: User = null;
      
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
    }
  }

}
