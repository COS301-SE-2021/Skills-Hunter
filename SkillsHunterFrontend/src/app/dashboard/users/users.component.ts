import { Component, OnInit } from '@angular/core';
import { getUserResponse } from '../../api-message-class/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchTerm: string = "";
  filter: boolean = false;
  open: boolean = false;
  role: number = -1;
  data: getUserResponse[] = [];
  show: getUserResponse[] = [];
  notificationType: number = 0;
  notification: string = "no message";
  
  constructor(private adminService:AdminService) { 
    this.adminService.getUsers().subscribe(result =>{
        this.data = result;
        this.show = result;
    },
    error=>{
      this.notification = "An error has occurred while retrieving all users from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    });
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(result =>{
        this.data = result;
        this.setImages();
    },
    error=>{
      this.notification = "An error has occurred while retrieving all users from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    });
  }

  onfilter(): void{
    this.filter = !this.filter;

    if(!this.filter)
      this.reset();
  }

  reset(): void{
    this.show = this.data;
  }

  filterData(): void{
    this.show = [];
    for(let count = 0; count < this.data.length; count++){
      if(this.data[count].openForWork == this.open){
        if(this.role != -1){
          if(this.role == this.data[count].userType)
            this.show.push(this.data[count]);
        }else{
          this.show.push(this.data[count]);
        }
      }
    }
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

  search(): void{
    this.show = [];
    if(this.searchTerm != ""){  
      for(let count  = 0; count < this.data.length; count++){
        if(this.match(this.searchTerm.toLowerCase(),this.data[count].name.toLowerCase(),this.data[count].surname.toLowerCase())){
          this.show.push(this.data[count]);
          console.log("true");
        }
      } 
    } 
  }

  setImages(): void{
    for(let count = 0; count < this.data.length; count++){
      this.adminService.getImage(this.data[count].userId).subscribe(result=>{
        //let el: HTMLImageElement = document.getElementById(result.result.UserId);
        //el.src = 
        console.log(result.result.UserId);
        document.getElementById(result.result.UserId).setAttribute( 'src',this.adminService.getApiUrl() + result.result.path);
      });
    }

    this.ngOnInit();
  }

}

    // name: string;
    // surname: string;
    // email: string;
    // password: string;
    // phone: string;
    // startDate: string;
    // openForWork: boolean;
    // userType: number;