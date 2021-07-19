import { Projects } from './../mock-data/mock-projects';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from '../classes/Project';
import { ProjectCRUDService } from '../services/project-crud.service';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss'],
})
export class CreateprojectComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateprojectComponent>,
    private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {}

  skills: string[] = ['Project Manager', 'C++', 'Java', 'JavaScript'];
  industries: string[] = ['Finance', 'Construction', 'Agriculture'];
  open: string[] = ['Yes', 'No'];

  projectInfo: FormGroup = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    skill: new FormControl('', [Validators.required]),
    openForApplication: new FormControl('', [Validators.required]),
  });

  //when submit is clicked this function is called to send info to service
  onSubmit() {

    this.cancel();
    
    var formData = new Project();

    if (
      <string>(<any>this.projectInfo.controls['openForApplication'].value) ==
      'Yes'
    ) {
      formData.openForApplication = true;
    } else {
      formData.openForApplication = true;
    }

    // Generate random number for Project ID:
    let max = 1000;
    let min = Projects.length;

    formData.projectId = (
      Math.floor(Math.random() * (max - min + 1)) + min
    ).toString();

    formData.name = <string>(
      (<any>this.projectInfo.controls['projectName'].value)
    );
    formData.description = <string>(
      (<any>this.projectInfo.controls['description'].value)
    );

    formData.owner = 'Mxo Developers';
    formData.location = 'Hatfield';

    formData.skill = (<string>(<any>this.projectInfo.controls['skill'].value))
      .toString()
      .split(',');

    Projects.push(formData);

    // the service is called below
    this.projectCrud.createProject(formData).subscribe((data) => {
      // console.log('Response post', data);
      console.log('Creating A Project...');
    });

    
  }

  //close dialog popup
  cancel() {
    this.dialogRef.close();
  }
}
