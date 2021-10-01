import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createProjectRequest } from 'src/app/classes/project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;

  newProject: createProjectRequest;
  
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<CreateProjectComponent>) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      //firstCtrl: ['', Validators.required]
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
      secondCtrl: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createProject(): void{  

    console.log(this.newProject);

    this.dialogRef.close();
  }
}
