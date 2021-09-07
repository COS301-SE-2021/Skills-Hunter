import { Component, OnInit} from '@angular/core';
import { UserAdvancedSearchComponent } from './user-advanced-search/user-advanced-search.component';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { mockUserData } from '../mock-data/mock-users';
import { getUserResponse } from '../api-message-class/message';
import { AdminService } from '../services/admin.service';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent implements OnInit {

  data: getUserResponse[] = [];
  searchTerm: string = "";
  
  constructor(public dialog: MatDialog,private adminService:AdminService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private _snackBar: MatSnackBar) { 
    iconRegistry.addSvgIcon('advanced', sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/filter_2.svg'));
    iconRegistry.addSvgIcon('all', sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/all.svg'));
  }


  ngOnInit(): void {
    document.getElementById('tool').style.display = "block";
    document.getElementById('side').style.display = "block";
    document.getElementById('userlist').style.display = "none"; 
    document.getElementById('house').style.display = "none";
  }

  advancedSearch(): void {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '60%';
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
        this._snackBar.open("An error occurred on the server while processing request","",{
          duration: 2000
        });        
      });
    });
  }

  viewAll(): void{
    this.adminService.getUsers().subscribe(result =>{
        this.data = result;
        this.ngOnInit();
    },
    error=>{
      this._snackBar.open("An error occurred on the server while processing request","",{
        duration: 2000
      });
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


  match(term: string,name: string,surname: string): boolean{
    let fullname: string = name + " " + surname;

    term = term.trim();
    
    if(name.indexOf(term) != -1)
      return true;

    if(surname.indexOf(term) != -1)
      return true;
    
    if(fullname.indexOf(term) != -1)
      return true;

    return false;
  }

  Search(): void{

    if(this.searchTerm != ""){

      this.adminService.getUsers().subscribe(response =>{
        this.data = [];
        
        for(let count  = 0; count < response.length; count++){
          if(this.match(this.searchTerm.toLowerCase(),response[count].name.toLowerCase(),response[count].surname.toLowerCase())){
            this.data.push(response[count]);
          }
        }
  
        this.ngOnInit();
      },
      error=>{
        this._snackBar.open("An error occurred on the server while processing request","",{
          duration: 2000
        });
      });     
    }
  }

  check(): void{
    alert('enter');
  }

}
