// import { Skills } from './../mock-data/mock-skills';
// import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
// import { Skill } from '../classes/Skill';
// import { AddSkillCollectionComponent } from '../createproject/add-skill-collection/add-skill-collection.component';
// import { AddSkillCategoryComponent } from '../createproject/add-skill-category/add-skill-category.component';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Skill } from '../classes/Skill';
import { Skills } from '../mock-data/mock-skills';

export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public selected?: boolean
  ) {
    if (selected === undefined) selected = false;
  }
}

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss'],
})
export class AddSkillsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddSkillsComponent>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dialog: MatDialog
  ) {}

  skills: Skill[] = Skills;

  ngOnInit(): void {
    // this.skills = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    // this.skills = Skills;
    // for (var x = 0; x < Skills.length; x++) {
    // this.skills.push(Skills[x].SkillName);
    // }
  }

  selected(skill) {
    console.log(skill);
    console.log('skill selected');
    this.dialogRef.close({ data: skill.SkillName });
  }

  // addNewSkill() {
  //   const configDialog = new MatDialogConfig();
  //   configDialog.backdropClass = 'backGround';
  //   configDialog.width = '50%';
  //   configDialog.height = '50%';
  //   const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);
  // }
}
