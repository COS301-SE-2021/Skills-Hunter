import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Candidate } from '../classes/Candidate';
import { Project } from '../classes/Project';
import { CandidatesList } from '../mock-data/mock-candidates';
import { ProjectCRUDService } from '../services/project-crud.service';
import { projectService } from '../services/project-edit.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
})
export class UpdateProjectComponent implements OnInit {
  title: string = 'Candidate';
  candidatesList: Candidate[] = CandidatesList;

  constructor(
    public dialogRef: MatDialogRef<UpdateProjectComponent>,
    private projectCrud: ProjectCRUDService,
    private projectData: projectService
  ) {}

  //this function retrieves the data that was set by the component calling this dialog/pop up
  get getProjectInfo(): Project {
    return this.projectData.projectBeingedited;
  }

  skills: string[] = [
    'Project Manager',
    'C++',
    'Java',
    'JavaScript',
    'Angular',
    'DotNet Core',
  ];
  industries: string[] = ['Finance', 'Construction', 'Agriculture', 'IT'];
  open: string[] = ['Yes', 'No'];

  ngOnInit(): void {
    this.projectInfo.controls['projectName'].setValue(this.getProjectInfo.name);
    this.projectInfo.controls['description'].setValue(
      this.getProjectInfo.description
    );
    this.projectInfo.controls['skill'].setValue(
      this.getProjectInfo.skill.slice()
    );
    this.projectInfo.controls['openForApplication'].setValue('Yes');
  }

  projectInfo: FormGroup = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    skill: new FormControl('', [Validators.required]),
    openForApplication: new FormControl('', [Validators.required]),
  });

  //when submit is clicked this function is called to send info to service
  onSubmit() {
    var formData = new Project();
    formData.projectId = this.getProjectInfo.projectId;
    formData.name = <string>(
      (<any>this.projectInfo.controls['projectName'].value)
    );
    formData.description = <string>(
      (<any>this.projectInfo.controls['description'].value)
    );
    formData.skill = <string[]>(<any>this.projectInfo.controls['skill'].value);
    if (
      <string>(<any>this.projectInfo.controls['openForApplication'].value) ==
      'yes'
    ) {
      formData.openForApplication = true;
    } else {
      formData.openForApplication = true;
    }

    //set new info on the card(replace old info with new after submit is clicked)
    this.getProjectInfo.name = formData.name;
    this.getProjectInfo.description = formData.description;
    this.getProjectInfo.skill = formData.skill;
    this.getProjectInfo.openForApplication = formData.openForApplication;

    //the service is called below
    this.projectCrud
      .updateProject(formData) //change so it calls update
      .subscribe((data) => {
        console.log('Response post', data);
      });

    this.dialogRef.close();
  }

  //close dialog popup
  cancel() {
    this.dialogRef.close();
  }
}
