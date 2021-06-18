import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {project} from '../classes/project';
import {ProjectCRUDService} from '../services/project-crud.service'
import { projectService } from '../services/project-edit.service';
import { CandidatesList } from './candidate/mock-candidates';
import { Candidate } from './candidate/Candidate';


@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})

export class UpdateprojectComponent implements OnInit {
  title :string = 'Candidate';
  candidatesList:Candidate[] = CandidatesList;

  constructor(public dialogRef:MatDialogRef<UpdateprojectComponent>,private projectCrud: ProjectCRUDService,private projectData:projectService) { }

  //this function retrieves the data that was set by the component calling this dialog/pop up
  get getProjectInfo():project
  {
    return this.projectData.projectBeingedited;
  }

  skills: string[] = ['project Manager', 'C++', 'java', 'js',"Angular","Net Core"];
  industries: string[] = ['finance','construction','agriculture','IT'];
  open: string[] = ['yes','no'];
  
  ngOnInit(): void {

    this.projectInfo.controls['projectName'].setValue(this.getProjectInfo.Name);
    this.projectInfo.controls['description'].setValue(this.getProjectInfo.Description);
    this.projectInfo.controls['industry'].setValue(this.getProjectInfo.Industry.slice());
    this.projectInfo.controls['skill'].setValue(this.getProjectInfo.Skill.slice());
    this.projectInfo.controls['openForApplication'].setValue("yes");
  }

 
  
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
    formData.Id=this.getProjectInfo.Id;
    formData.Name=<string><any>this.projectInfo.controls['projectName'].value;
    formData.Description=<string><any>this.projectInfo.controls['description'].value;
    formData.Industry=<string[]><any>this.projectInfo.controls['industry'].value;
    formData.Skill=<string[]><any>this.projectInfo.controls['skill'].value;
    if(<string><any>this.projectInfo.controls['openForApplication'].value=='yes')
    {
      formData.OpenForApplication=true;
    }
    else
    {
      formData.OpenForApplication=true;
    }

    //set new info on the card(replace old info with new after submit is clicked)
    this.getProjectInfo.Name=formData.Name
    this.getProjectInfo.Description=formData.Description;
    this.getProjectInfo.Industry=formData.Industry;
    this.getProjectInfo.Skill=formData.Skill;
    this.getProjectInfo.OpenForApplication=formData.OpenForApplication;

    //the service is called below 
    this.projectCrud.updateProject(formData)//change so it calls update
    .subscribe(
      data=>{
        console.log('Response post', data);
      }
    );

    this.dialogRef.close();
  }

  //close dialog popup
  cancel()
  {
    this.dialogRef.close();
  }
}
