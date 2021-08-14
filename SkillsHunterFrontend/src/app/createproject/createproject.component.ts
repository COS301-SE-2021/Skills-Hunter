import { Collections } from './../mock-data/mock-collections';
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
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { Project } from '../classes/Project';
import { ProjectCRUDService } from '../services/project-crud.service';
import { Skills } from '../mock-data/mock-skills';
import { AddSkillCollectionComponent } from './add-skill-collection/add-skill-collection.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddSkillCategoryComponent } from './add-skill-category/add-skill-category.component';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss'],
})
export class CreateprojectComponent implements OnInit {
  isLinear = false;

  projectBasicInfo: FormGroup;
  projectSkillsAndCollections: FormGroup;

  dropdownListForSkills = [];
  selectedItemsForSkills = [];
  selectedObjectsSkills = [];

  // for keeping track of selected Skill and Collection objects.
  // CategoryList

  dropdownListForCollections = [];
  selectedItemsForCollections = [];
  selectedObjectsCollections = [];

  dropdownSettings: IDropdownSettings;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectBasicInfo = this._formBuilder.group({
      basicInfo: ['', Validators.required],
    });
    this.projectSkillsAndCollections = this._formBuilder.group({
      skillsAndCollections: ['', Validators.required],
    });

    for (var x = 0; x < Skills.length; x++) {
      this.dropdownListForSkills.push({
        item_id: Skills[x].SkillId,
        item_text: Skills[x].SkillName,
      });
    }

    for (var x = 0; x < Collections.length; x++) {
      this.dropdownListForCollections.push({
        item_id: Collections[x].CollectionId,
        item_text: Collections[x].CollectionName,
      });
    }

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

  addSkill() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '80%';
    const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);

    dialogRef.afterClosed().subscribe((skill) => {
      if (skill != undefined) {
        console.log('Received skill as = ');

        var obj = new Skill();
        obj.SkillId = skill.data.SkillId;
        obj.SkillName = skill.data.SkillName;
        obj.SkillWeight = skill.data.SkillWeight;

        Skills.push(obj);

        this.selectedObjectsSkills.push(obj);

        this.dropdownListForSkills = [];

        console.log(this.dropdownListForSkills);

        var sel = {
          item_id: obj.SkillId,
          item_text: obj.SkillName,
        };

        this.onItemSelect(sel);

        this.ngOnInit();
      } else console.log('Returned Empty');
    });
  }

  addCollection() {
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
