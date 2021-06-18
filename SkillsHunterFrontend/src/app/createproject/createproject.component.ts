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

  
  skills: string[] = ['Project Manager', 'C++', 'Java', 'JavaScript'];
  industries: string[] = ['Finance','Construction','Agriculture'];
  open: string[] = ['Yes','No'];
  
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

    formData.Name="Skills Hunter";//<string><any>this.projectInfo.controls['projectName'].value;
    formData.Description="Website";//<string><any>this.projectInfo.controls['description'].value;
    //formData.Industry="IT";//<string><any>this.projectInfo.controls['industry'].value;
    //formData.Skill="C++";//<string><any>this.projectInfo.controls['skill'].value;
    //Mock
    
    formData.Owner = "Mxo";
    formData.Location = "Hatfield";

    if(<string><any>this.projectInfo.controls['openForApplication'].value=='Yes')
    {
      formData.OpenForApplication=true;
    }
    else
    {
      formData.OpenForApplication=true;
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
