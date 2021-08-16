import { Collection } from './../classes/Collection';
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
  // var selectedObjectsSkills = Skill[];
  selectedObjectsSkills = [];

  // for keeping track of selected Skill and Collection objects.
  // CategoryList

  dropdownListForCollections = [];
  selectedItemsForCollections = [];

  // var selectedObjectsCollections = Collection[];
  selectedObjectsCollections = [];

  dropdownSettings: IDropdownSettings;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectBasicInfo = this._formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
    });
    this.projectSkillsAndCollections = this._formBuilder.group({
      projectSkills: ['', Validators.required],
      projectCollections: ['', Validators.required],
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

  // checkIfSkillOrCollection(arr: any[]){
  //   for(var x=0; x<arr.length; x++){
  //     if(arr[x].)
  //   }
  // }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  addSkill() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '60%';
    configDialog.height = '450px';
    const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);

    dialogRef.afterClosed().subscribe((skill) => {
      if (skill != undefined) {
        console.log('Received skill as = ');

        var obj = new Skill();
        obj.SkillId = skill.data.SkillId;
        obj.SkillName = skill.data.SkillName;
        obj.SkillWeight = skill.data.SkillWeight;

        Skills.push(obj);

        console.log('LOGGING THE OBJECT');
        console.log(obj);

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
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '60%';
    configDialog.height = '450px';
    const dialogRef = this.dialog.open(
      AddSkillCollectionComponent,
      configDialog
    );

    dialogRef.afterClosed().subscribe((collection) => {
      if (collection != undefined) {
        console.log('Received skill as = ');

        var obj = new Collection();
        obj.CollectionId = collection.data.CollectionId;
        obj.CollectionName = collection.data.CollectionName;
        obj.Skills = collection.data.Skills;

        Collections.push(obj);

        this.selectedObjectsCollections.push(obj);

        this.dropdownListForCollections = [];

        console.log(this.dropdownListForCollections);

        var sel = {
          item_id: obj.CollectionId,
          item_text: obj.CollectionName,
        };

        this.onItemSelect(sel);

        this.ngOnInit();
      } else console.log('Returned Empty');
    });
  }

  createTheProject() {
    // var proj = new Project();
    // proj.ProjectId = Projects.length.toString();
    // proj.Name = 'Skills Hunter';
    // proj.Description = 'Describe the project';
    // proj.Owner = 'XYC Devs';
    // proj.Location = 'Hatfield';

    console.log('CONSOLING');
    // if (this.selectedObjectsSkills) {
    console.log(this.selectedObjectsSkills);
    // }
    // var arrSkillsAndCollections: string[];

    // for (var x = 0; x < this.selectedObjectsSkills.length; x++) {
    //   arrSkillsAndCollections.push(this.selectedItemsForSkills[x]);
    // }

    // proj.Skill = this.selectedObjectsSkills.toString();
    // proj.Collections = this.selectedObjectsCollections;
    // proj.OpenForApplication = false;

    // Projects.push(proj);
    console.log('Created Project!');
  }

  cancel() {
    this._router.navigate([`home`]);
  }

  // data = {
  //   placeHolder: 'Locations',
  //   enableSelectClear: true,
  //   enableSearch: true,
  // };
  // options = [
  //   { name: 'ind', value: 'India' },
  //   { name: 'nep', value: 'Nepal', checked: true },
  //   { name: 'bon', value: 'Bondhar' },
  //   { name: 'Kat', value: 'Kathmandu', checked: true },
  //   { name: 'ner', value: 'Nerli' },
  //   { name: 'bom', value: 'Bombay' },
  // ];
  // changeSelection(options) {
  //   // process your custom logic here
  //   console.log(options);
  // }
}
