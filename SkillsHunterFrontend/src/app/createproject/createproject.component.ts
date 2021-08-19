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
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Skill } from '../classes/Skill';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss'],
})
export class CreateprojectComponent implements OnInit {
  isLinear = true;

  projectBasicInfo: FormGroup;
  projectSkillsAndCollections: FormGroup;

  dropdownListForSkills = [];
  selectedItemsForSkills = [];
  selectedObjectsSkills = [];

  dropdownListForCollections = [];
  selectedItemsForCollections = [];
  collectionOfSkills = [];

  existingSkillsArray = [];
  newSkillsArray = [];

  existingCollectionsArray = [];
  newCollectionsArray = [];

  collectionWeight = 0;
  skillWeight = 0;

  ProjectList = [];
  SkillsList = [];
  CollectionsList = [];

  dropdownSettings: IDropdownSettings;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dialog: MatDialog,
    private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {
    // this.projectCrud.getAllProjects().subscribe((data) => {
    //   this.ProjectList = data;
    //   console.log('Response for GetProjects: ', data);
    // });

    // for(var x=0; this.ProjectList.length; x++){

    // }
    // this.projectCrud.get()
    // .subscribe(
    //   data=>{
    //     this.ProjectList=data;
    //     console.log('Response for GetProjects: ', data);
    //   }
    // );

    this.projectBasicInfo = this._formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
    });
    this.projectSkillsAndCollections = this._formBuilder.group({
      projectSkills: ['', Validators.required],
      projectCollections: ['', Validators.required],
    });

    // for (var x = 0; x < Skills.length; x++) {
    //   this.dropdownListForSkills.push({
    //     item_id: Skills[x].SkillId,
    //     item_text: Skills[x].SkillName,
    //   });
    // }

    // for (var x = 0; x < Collections.length; x++) {
    //   this.dropdownListForCollections.push({
    //     item_id: Collections[x].CollectionId,
    //     item_text: Collections[x].CollectionName,
    //   });
    // }

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
    // for (var x = 0; x < Skills.length; x++) {
    //   if (Skills[x].SkillId === id && Skills[x].SkillName === name) {
    //     return [0, x];
    //   }
    // }

    // check collections:
    // for (var x = 0; x < Collections.length; x++) {
    //   if (
    //     Collections[x].CollectionId === id &&
    //     Collections[x].CollectionName === name
    //   ) {
    //     return [1, x];
    //   }
    // }

    return [-1, -1];
  }

  onItemSelect(item: any) {
    var occurance = this.searchForOccurance(item.item_id, item.item_text);

    // SKILL = 0,x
    // COLLECTION = 1,x
    // NEITHER = -1,-1

    if (occurance[0] == 0) {
      // process skill:
      // var obj = new Skill();
      // obj.SkillId = Skills[occurance[1]].SkillId;
      // obj.SkillName = Skills[occurance[1]].SkillName;
      // obj.SkillWeight = this.skillWeight;

      // this.selectedObjectsSkills.push(obj);

      // this.existingSkillsArray.push(obj);
    } else if (occurance[0] == 1) {
      // process collection:
      // var col = new Collection();
      // col.CollectionId = Collections[occurance[1]].CollectionId;
      // col.CollectionName = Collections[occurance[1]].CollectionName;
      // col.Skills = Collections[occurance[1]].Skills;

      // this.collectionOfSkills.push(col);
    } else {
      console.log('Skill/Collection not Found.');
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
    // const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);

    // dialogRef.afterClosed().subscribe((skill) => {
    //   if (skill != undefined) {
    //     var newSkill = {
    //       name: skill.data.name,
    //       categories: skill.data.categories,
    //       weight: skill.data.weight,
    //     };

    //     this.newSkillsArray.push(newSkill);

    //     console.log('Added the Skills.');
    //     this.dropdownListForSkills = [];

    //     this.ngOnInit();
    //   } else console.log('Returned Empty Skill');
    // });
  }

  addCollection() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '60%';
    configDialog.height = '450px';
    // const dialogRef = this.dialog.open(
    //   AddSkillCollectionComponent,
    //   configDialog
    // );


    // dialogRef.afterClosed().subscribe((collection) => {
    //   if (collection != undefined) {
    //     var newCollection = {
    //       name: collection.data.name,
    //       description: collection.data.description,
    //       weight: collection.data.weight,
    //       skills: collection.data.skills,
    //     };

    //     this.collectionOfSkills.push(newCollection);

    //     console.log('Added the Collection.');
    //     this.dropdownListForCollections = [];

    //     this.ngOnInit();
    //   } else console.log('Returned Empty Collection');
    // });
  }

  createTheProject() {
    var proj = {
      name: this.projectBasicInfo.value.projectName,
      description: this.projectBasicInfo.value.projectDescription,
      location: 'Hatfield',
      openForApplication: false,
      existingSkills: [this.existingSkillsArray],
      newSkills: [this.existingSkillsArray],
      skillCollections: [this.collectionOfSkills],
    };

    console.log('Creating Project...\n');

    console.log(proj);

    this.projectCrud.createProject(proj).subscribe((data) => {
      console.log('Response for Create Project: ', data);
    });

    console.log('Created Project!');
    this.cancel();
  }

  cancel() {
    this._router.navigate([`home`]);
  }
}
