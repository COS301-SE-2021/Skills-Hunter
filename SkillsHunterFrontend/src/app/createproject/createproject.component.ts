import { Skill } from 'src/app/classes/Skill';
import { Projects } from './../mock-data/mock-projects';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSkillsComponent } from './../add-skills/add-skills.component';
import { AddSkillsCollectionComponent } from './../add-skills-collection/add-skills-collection.component';
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
  selectedSkills=[];//this array will show existing skills that are selected by user
  constructor(private _formBuilder: FormBuilder, private _router: Router,private dialog: MatDialog) {
   
    
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  
 
  individualSkill() {
    //this._router.navigate([`createproject`]);
    
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '80%';
    const dialogRef = this.dialog.open(AddSkillsComponent, configDialog);
   // console.log("back");
    dialogRef.afterClosed().subscribe(skill => {
     
      //console.log("returned: "+skill.data);
      if(skill !=undefined)
      {
        this.selectedSkills.push(skill.data);
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
  }

  skillCollection() {
    //this._router.navigate([`createproject`]);
    console.log("in");
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '80%';
    const dialogRef = this.dialog.open(AddSkillsCollectionComponent, configDialog);
   
  }
  
}
