import { Component, OnInit,Input } from '@angular/core';
import { Project } from '../Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() _project:Project= {id:-1,name:'',description:'',industry:'',owner:'',location:'',skills:[''],openForApplication:false};
  
  constructor() { 
  }
  userType:number=-1;
  ngOnInit(): void {
    if(localStorage.getItem("rememberMe") !== null){
      if(localStorage.getItem("rememberMe") == "true"){
          this.userType = parseInt(localStorage.getItem("role"));
         
        }else{
          this.userType = parseInt(sessionStorage.getItem("role"));
       }
    }
  }

}
