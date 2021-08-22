import { SkillCollection } from 'src/app/classes/SkillCollection';
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
import { mockSkillCollection } from '../mock-data/mock-collection';
import { AddSkillCategoryComponent } from './add-skill-category/add-skill-category.component';
import { AddSkillCollectionComponent } from './add-skill-collection/add-skill-collection.component';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',

  styleUrls: ['./createproject.component.scss'],
})
export class CreateprojectComponent implements OnInit {
  isLinear = false;

  // existing skills:
  selectedSkills = [];
  selectedCollections = [];

  // new skills
  newSelectedSkills = [];

  dropdownOptionsSkills = Skills;
  dropdownOptionsCollections = mockSkillCollection;

  projectBasicInfo: FormGroup;
  projectSkillsAndCollections: FormGroup;

  configSkills = {
    displayKey: 'Name', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Skills', // label thats displayed in search input,
    searchOnKey: 'Name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  configCollections = {
    displayKey: 'Name', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '120px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Collections', // label thats displayed in search input,
    searchOnKey: 'Name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  ngOnInit(): void {
    this.projectBasicInfo = this._formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
    });
    this.projectSkillsAndCollections = this._formBuilder.group({
      projectSkills: ['', Validators.required],
      projectCollections: ['', Validators.required],
    });

    this.dropdownOptionsSkills = Skills;
    this.dropdownOptionsCollections = mockSkillCollection;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dialog: MatDialog,
    private projectCrud: ProjectCRUDService
  ) {}

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

  //     var col = {
  //       ProjectSkillCollectionId: mockSkillCollection[occurance[1]].ProjectSkillCollectionId,
  //       Name: mockSkillCollection[occurance[1]].Name,
  //       Description: mockSkillCollection[occurance[1]].Description,
  //       Weight: mockSkillCollection[occurance[1]].Weight,
  //    }

  addSkill() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '45%';
    configDialog.height = '450px';
    const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);

    dialogRef.afterClosed().subscribe((skill) => {
      if (skill != undefined) {
        console.log('New Skill To Be Added:');
        this.selectedSkills.push(skill.data);
        this.newSelectedSkills.push(skill.data);
        Skills.push(skill.data);
        this.ngOnInit();
      } else console.log('Returned Empty Skill');
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
        console.log('New Collection To Be Added:');
        this.selectedCollections.push(collection.data);
        this.ngOnInit();
      } else console.log('Returned Empty Collection');
    });
  }

  createTheProject() {
    var selectedSkillsIDs = [];
    var processedCollections = [];

    // Process the existing skills:
    for (var x = 0; x < this.selectedSkills.length; x++) {
      selectedSkillsIDs.push({
        SkillId: this.selectedSkills[x].SkillId,
        Weight: 0, // temporary value
      });
    }

    // // Process the collections:
    // for (var x = 0; x < this.selectedCollections.length; x++) {
    //   processedCollections.push({
    //     "Name" : this.selectedCollections[x].Name,
    //     "Description" : this.selectedCollections[x].Description,
    //     "Weight" : this.selectedCollections[x].Weight,
    //   });
    // }

    /// Create the Project:
    var proj = {
      Name: this.projectBasicInfo.value.projectName,
      Description: this.projectBasicInfo.value.projectDescription,
      Location: 'Hatfield',
      OpenForApplication: false,
      ExistingSkills: [selectedSkillsIDs],
      NewSkills: [this.newSelectedSkills],
      SkillCollections: [this.selectedCollections],
    };

    console.log('Creating Project...\n');
    console.log(proj);

    // this.projectCrud.createProject(proj).subscribe((data) => {
    //   console.log('Response for Create Project: ', data);
    // });

    console.log('Created Project!');
    this.cancel();
  }

  cancel() {
    this._router.navigate([`home`]);
  }
}
