import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed: boolean = false;
  public samplePagesCollapsed: boolean = false;
  public name: string = "";
  public lastname: string = "";
  public userType: number = -1;
  public userTypeName: string = ""; 
  constructor() {
  }

  ngOnInit() {

    if(localStorage.getItem("rememberMe") !== null){
      if(localStorage.getItem("rememberMe") == "true"){
          this.userType = parseInt(localStorage.getItem("role"));
          this.name = localStorage.getItem("name");
          this.lastname = localStorage.getItem("surname");
          this.userTypeName = this.userType == 0 ? "Candidate" : (this.userType == 1 ? "Project Manager" : (this.userType == 2 ? "Organisation" : (this.userType == 3 ? "System Administrator" : ""))); 
      }else{
          this.userType = parseInt(sessionStorage.getItem("role"));
          this.name = sessionStorage.getItem("name");
          this.lastname = sessionStorage.getItem("surname");
          this.userTypeName = this.userType == 0 ? "Candidate" : (this.userType == 1 ? "Project Manager" : (this.userType == 2 ? "Organisation" : (this.userType == 3 ? "System Administrator" : ""))); 
      }
    }

    document.addEventListener("roleSet", () => {
      if(localStorage.getItem("rememberMe") == "true"){
        this.userType = parseInt(localStorage.getItem("role"));
        this.name = localStorage.getItem("name");
        this.lastname = localStorage.getItem("surname");
        this.userTypeName = this.userType == 0 ? "Candidate" : (this.userType == 1 ? "Project Manager" : (this.userType == 2 ? "Organisation" : (this.userType == 3 ? "System Administrator" : ""))); 
      }else{
        this.userType = parseInt(sessionStorage.getItem("role"));
        this.name = sessionStorage.getItem("name");
        this.lastname = sessionStorage.getItem("surname");
        this.userTypeName = this.userType == 0 ? "Candidate" : (this.userType == 1 ? "Project Manager" : (this.userType == 2 ? "Organisation" : (this.userType == 3 ? "System Administrator" : ""))); 
      }
      this.ngOnInit();
    });

    const body = document.querySelector('body');
    
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });



  }

}
