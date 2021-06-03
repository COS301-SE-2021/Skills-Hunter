import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {project} from '../classes/project';
import {ProjectCRUDService} from '../services/project-crud.service'
import { projectService } from '../services/project-edit.service';


@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})
export class UpdateprojectComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<UpdateprojectComponent>,private projectCrud: ProjectCRUDService,private projectData:projectService) { }

  //this function retrieves the data that was set by the component calling this dialog/pop up
  get getProjectInfo():project
  {
    return this.projectData.projectBeingedited;
  }

  ngOnInit(): void {

    this.projectInfo.controls['projectName'].setValue(this.getProjectInfo.projectName);
    this.projectInfo.controls['description'].setValue(this.getProjectInfo.description);
    this.projectInfo.controls['industry'].setValue(this.getProjectInfo.industry);
    this.projectInfo.controls['skill'].setValue(this.getProjectInfo.skill);
    this.projectInfo.controls['openForApplication'].setValue(this.getProjectInfo.openForApplication);
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

    formData.projectName=<string><any>this.projectInfo.controls['projectName'].value;
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
    this.projectCrud.createProject(formData)//change so it calls update
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
