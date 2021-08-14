import { Skill } from 'src/app/classes/Skill';
import { Projects } from './../mock-data/mock-projects';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSkillsComponent } from './../add-skills/add-skills.component';
import { AddSkillsCollectionComponent } from './../add-skills-collection/add-skills-collection.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { Project } from '../classes/Project';
import { ProjectCRUDService } from '../services/project-crud.service';
import { Skills } from '../mock-data/mock-skills';
import { AddSkillCollectionComponent } from './add-skill-collection/add-skill-collection.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss'],
})
export class CreateprojectComponent implements OnInit {
  isLinear = false;

  projectBasicInfo: FormGroup;
  projectSkillsAndCollections: FormGroup;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectBasicInfo = this._formBuilder.group({
      // basicInfo: ['', Validators.required],
      basicInfo: [''],
    });
    this.projectSkillsAndCollections = this._formBuilder.group({
      // skillsAndCollections: ['', Validators.required],
      skillsAndCollections: [''],
    });

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
    ];

    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    // ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  individualSkill() {
    //   //this._router.navigate([`createproject`]);
    //   const configDialog = new MatDialogConfig();
    //   configDialog.backdropClass = 'backGround';
    //   configDialog.width = '40%';
    //   configDialog.height = '80%';
    //   const dialogRef = this.dialog.open(AddSkillsComponent, configDialog);
    //   // console.log("back");
    //   dialogRef.afterClosed().subscribe((skill) => {
    //     //console.log("returned: "+skill.data);
    //     if (skill != undefined) {
    //       this.selectedSkills.push(skill.data);
    //     } else {
    //       console.log('returned empty:');
    //     } //dialog closed
    //   });
  }

  skillCollection() {
    //   //this._router.navigate([`createproject`]);
    //   console.log('in');
    //   const configDialog = new MatDialogConfig();
    //   configDialog.backdropClass = 'backGround';
    //   configDialog.width = '40%';
    //   configDialog.height = '80%';
    //   // const dialogRef = this.dialog.open(AddSkillsCollectionComponent, configDialog);
    //   const dialogRef = this.dialog.open(
    //     AddSkillCollectionComponent,
    //     configDialog
    //   );
  }

  createTheProject() {
    //   var proj = new Project();
    //   proj.ProjectId = Projects.length.toString();
    //   proj.Name = 'Skills Hunter';
    //   proj.Description = '';
    //   proj.Owner = 'XYC Devs';
    //   proj.Location = 'Hatfield';
    //   proj.Skill = ['Angular', 'DotNet Core'];
    //   proj.OpenForApplication = false;
    //   console.log('Created Project!');
  }
}
