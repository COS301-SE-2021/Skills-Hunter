import { Component, OnInit } from '@angular/core';
import { getProjectsResponse } from '../../api-message-class/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  filter: boolean = false;
  data: getProjectsResponse[] = [];
  show: getProjectsResponse[] = [];
  open: boolean = false;
  notificationType: number = 0;
  notification: string = "no message";
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
      this.adminService.getProjects().subscribe(result =>{
        this.data = result;
        this.show = result; 
    },
    error=>{
      this.notification = "An error has occurred while retrieving all users from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    })
  }

  onfilter(): void{
    this.filter = !this.filter;

    if(!this.filter)
      this.reset();
  }

  reset(): void{
    this.show = this.data;
  }

}
