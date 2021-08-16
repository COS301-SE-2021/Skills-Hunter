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
  selectedObjectsSkills = [];

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

  searchForOccurance(id: string, name: string) {
    // start with skills:
    for (var x = 0; x < Skills.length; x++) {
      if (Skills[x].SkillId === id && Skills[x].SkillName === name) {
        return [0, x];
      }
    }

    // check collections:
    for (var x = 0; x < Collections.length; x++) {
      if (
        Collections[x].CollectionId === id &&
        Collections[x].CollectionName === name
      ) {
        return [1, x];
      }
    }

    return [-1, -1];
  }

  onItemSelect(item: any) {
    var occurance = this.searchForOccurance(item.item_id, item.item_text);

    // SKILL = 0,x
    // COLLECTION = 1,x
    // NEITHER = -1,-1

    if (occurance[0] == 0) {
      // process skill:
      var obj = new Skill();
      obj.SkillId = Skills[occurance[1]].SkillId;
      obj.SkillName = Skills[occurance[1]].SkillName;
      obj.SkillWeight = 11;

      this.selectedObjectsSkills.push(obj);
    } else if (occurance[0] == 1) {
      // process collection:
      var col = new Collection();
      col.CollectionId = Collections[occurance[1]].CollectionId;
      col.CollectionName = Collections[occurance[1]].CollectionName;
      col.Skills = Collections[occurance[1]].Skills;

      this.selectedObjectsCollections.push(col);
    } else {
      console.log('Skill/Collection not found.');
    }
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  addSkill() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '45%';
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
    var proj = new Project();
    proj.ProjectId = Projects.length.toString();
    proj.Name = 'Skills Hunter';
    proj.Description = 'Describe the project';
    proj.Owner = 'XYC Devs';
    proj.Location = 'Hatfield';

    console.log(this.selectedObjectsSkills);
    console.log(this.selectedObjectsCollections);
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
