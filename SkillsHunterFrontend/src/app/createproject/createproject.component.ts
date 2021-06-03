import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {project} from '../classes/project';
import {ProjectCRUDService} from '../services/project-crud.service'

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<CreateprojectComponent>,private projectCrud: ProjectCRUDService) { }

  ngOnInit(): void {
  }

  
  skills: string[] = ['project Manager', 'C++', 'java', 'js'];
  industries: string[] = ['finance','construction','agriculture'];
  open: string[] = ['yes','no'];
  
  projectInfo:FormGroup=new FormGroup({
    projectName:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    industry:new FormControl('',[Validators.required]),
    skill:new FormControl('',[Validators.required]),
    openForApplication:new FormControl('',[Validators.required])
  });

  //when submit is clicked this function is called to send info to service
  onSubmit(){
    var formData=new project();

    formData.name=<string><any>this.projectInfo.controls['projectName'].value;
    formData.description=<string><any>this.projectInfo.controls['description'].value;
    formData.industry=<string><any>this.projectInfo.controls['industry'].value;
    formData.skill=<string><any>this.projectInfo.controls['skill'].value;

    if(<string><any>this.projectInfo.controls['openForApplication'].value=='yes')
    {
      formData.openForApplication=true;
    }
    else
    {
      formData.openForApplication=true;
    }

    //the service is called below 
    this.projectCrud.createProject(formData)
    .subscribe(
      data=>{
        console.log('Response post', data);
      }
    );
  }
  
  //close dialog popup
  cancel()
  {
    this.dialogRef.close();
  }
}
