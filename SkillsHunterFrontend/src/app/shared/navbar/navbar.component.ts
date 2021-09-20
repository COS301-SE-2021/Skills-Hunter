import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ConnectionService } from 'ng-connection-service';
import { notification } from 'src/app/api-message-class/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  public firstname:string = "";
  public lastname: string = "";
  public userType: number = -1;
  public imageUrl: string;
  public isConnected = true;  
  public noInternetConnection: boolean = false; 
  public messages:notification[] = [] 

  constructor(private _router: Router,config: NgbDropdownConfig,private adminService:AdminService,private connectionService: ConnectionService) {
    config.placement = 'bottom-right';

    this.connectionService.monitor().subscribe(isConnected => {  
      this.isConnected = isConnected; 
      if (this.isConnected) {  
        this.noInternetConnection=false;  
      }  
      else {  
        this.noInternetConnection=true;  
      }  
    }) 
  }

  allMessages(): void{
    this._router.navigate([`notifications`]);
  }

  ngOnInit() {
      if(localStorage.getItem("rememberMe") !== null){
      if(localStorage.getItem("rememberMe") == "true"){
          this.userType = parseInt(localStorage.getItem("role"));
          this.firstname = localStorage.getItem("name");
          this.lastname = localStorage.getItem("surname");
      }else{
          this.userType = parseInt(localStorage.getItem("role"));
          this.firstname = sessionStorage.getItem("name");
          this.lastname = sessionStorage.getItem("surname");
      }

      this.adminService.getNotifications().subscribe(result=>{
        this.messages = result;
      },error=>{

      })
    }

    document.addEventListener("roleSet", () => {
      if(localStorage.getItem("rememberMe") == "true"){
        this.userType = parseInt(localStorage.getItem("role"));
        this.firstname = localStorage.getItem("name");
        this.lastname = localStorage.getItem("surname");
      }else{
        this.userType = parseInt(localStorage.getItem("role"));
        this.firstname = sessionStorage.getItem("name");
        this.lastname = sessionStorage.getItem("surname");
      }
      this.ngOnInit();
    });

    this.setImageUrl();
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  setImageUrl(): void{
    this.adminService.getImageWithoutId().subscribe(result=>{
      if(result.result != null)
        this.imageUrl = this.adminService.getApiUrl() + result.result.path;
      else{
        this.imageUrl = "assets/images/profile.png";
      }
    },error=>{
      alert("error loading image");
    });
  }  

}
