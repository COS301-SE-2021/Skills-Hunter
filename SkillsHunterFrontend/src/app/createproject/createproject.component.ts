import { Skill } from 'src/app/classes/Skill';
import { Projects } from './../mock-data/mock-projects';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { Project } from '../classes/Project';
import { ProjectCRUDService } from '../services/project-crud.service';
import { Skills } from '../mock-data/mock-skills';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss'],
})
export class CreateprojectComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  
}
