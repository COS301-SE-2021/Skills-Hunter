import { Component, OnInit } from '@angular/core';
import { categoryModel, skillModel, getProjectsResponse, getUserResponse } from '../../api-message-class/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  categories: categoryModel[] = [];
  projects: getProjectsResponse[] = [];
  skills: skillModel[] = [];
  users: getUserResponse[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void{
    this.adminService.getUsers().subscribe(result =>{
        this.users = result;
    },
    error=>{
        alert("error loading users");
    });

    this.adminService.getSkills().subscribe(result => {
      this.skills = result.skills;
    },
    error=>{
      alert("error loading skills");
    });

    this.adminService.getProjects().subscribe(result =>{
        this.projects = result;
    },
    error=>{
      alert("error loading projects");
    })

    this.adminService.getCategories().subscribe(result =>{
        this.categories = result.category;
    },
    error=>{
      alert("error loading categories");
    
    });

  }

}
