import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

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
  
  constructor(config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
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

  // toggle right sidebar
  // toggleRightSidebar() {
  //   document.querySelector('#right-sidebar').classList.toggle('open');
  // }

}
