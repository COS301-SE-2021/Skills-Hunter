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
import { Skill } from '../classes/Skill';
import { mockSkillCollection } from '../mock-data/mock-collection';
import { AddSkillCategoryComponent } from './add-skill-category/add-skill-category.component';
import { AddSkillCollectionComponent } from './add-skill-collection/add-skill-collection.component';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',

  styleUrls: ['./createproject.component.scss'],
})
export class CreateprojectComponent implements OnInit {
  isLinear = false;
  projName: string;
  projDescription: string;
  projLocation: string;
  isCheckedOpenForApplications = true;
  toggleNewSkillsAdded = false;

  // existing skills:
  selectedSkills = [];
  selectedCollections = [];

  // new skills
  newSelectedSkills = [];

  // options for the dropdown for skills and collections:
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
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Collections', // label thats displayed in search input,
    searchOnKey: 'Name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  ngOnInit(): void {
    this.projectBasicInfo = new FormGroup({
      projectName: new FormControl('', [Validators.required]),
      projectDescription: new FormControl('', [Validators.required]),
      projectLocation: new FormControl('', [Validators.required]),
    });
    this.projectSkillsAndCollections = new FormGroup({
      projectSkills: new FormControl('', [Validators.required]),
      projectCollections: new FormControl('', [Validators.required]),
    });

    this.dropdownOptionsSkills = Skills;
    this.dropdownOptionsCollections = mockSkillCollection;
  }

  constructor(
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

  captureBasicDetails() {
    this.projName = this.projectBasicInfo.get('projectName').value;
    this.projDescription =
      this.projectBasicInfo.get('projectDescription').value;
    this.projLocation = this.projectBasicInfo.get('projectLocation').value;
  }

  addSkill() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '45%';
    configDialog.height = '550px';
    const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);

    dialogRef.afterClosed().subscribe((skill) => {
      if (skill != undefined) {
        this.selectedSkills.push(skill.data);
        this.newSelectedSkills.push(skill.data);
        Skills.push(skill.data);
        // this.isCheckedOpenForApplications = false;
        // this.toggleNewSkillsAdded = true;
        // this.ngOnInit();
      } else console.log('Returned Empty Skill');
    });
  }

  changeDetectedSkills(allSelectedSkills: any) {
    // detect changes in selecting new and old skills
    var arrNew = [];
    var arr: any[] = allSelectedSkills.value;

    for (var x = 0; x < arr.length; x++) {
      if (arr[x].SkillId == undefined) {
        arrNew.push(arr[x]);
      }
    }

    this.newSelectedSkills = arrNew;

    // disable the open toggle if there are any new skills present:
    if (this.newSelectedSkills.length > 0) {
      this.isCheckedOpenForApplications = false;
      this.toggleNewSkillsAdded = true;
    } else {
      this.toggleNewSkillsAdded = false;
    }
  }

  changeDetectedCollections(a: any) {
    this.selectedCollections = a;
    console.log(a);
  }

  addCollection() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '45%';
    configDialog.height = '550px';
    const dialogRef = this.dialog.open(
      AddSkillCollectionComponent,
      configDialog
    );

    dialogRef.afterClosed().subscribe((collection) => {
      if (collection != undefined) {
        this.selectedCollections.push(collection.data);
        mockSkillCollection.push(collection.data);
        // this.ngOnInit();
      } else console.log('Returned Empty Collection');
    });
  }

  extractSkillId(a: any[], b: any[]) {
    var dupp = false;
    var selectedSkillsIDs = [];

    // Process the existing skills:
    for (var x = 0; x < a.length; x++) {
      dupp = false;
      for (var y = 0; y < b.length; y++) {
        if (a[x].SkillId == b[y].SkillId) {
          dupp = true;
          break;
        }
      }

      if (!dupp)
        selectedSkillsIDs.push({
          SkillId: a[x].SkillId,
          Weight: 0,
        });
    }
    return selectedSkillsIDs;
  }

  createTheProject() {
    var processedCollections = [];

    var selectedSkillsIDs = this.extractSkillId(
      this.selectedSkills,
      this.newSelectedSkills
    );

    // Process the collections:
    for (var x = 0; x < this.selectedCollections.length; x++) {
      var extractCollectionSkillsId = [];

      if (this.selectedCollections[x].Skills != undefined)
        for (var q = 0; q < this.selectedCollections[x].Skills.length; q++) {
          extractCollectionSkillsId.push({
            SkillId: this.selectedCollections[x].Skills[q].SkillId,
            Weight: 0,
          });
        }

      processedCollections.push({
        Name: this.selectedCollections[x].Name,
        Description: this.selectedCollections[x].Description,
        Weight: this.selectedCollections[x].Weight,
        Skills: extractCollectionSkillsId,
      });
    }

    /// Create the Project:
    var proj = {
      Name: this.projName,
      Description: this.projDescription,
      Location: this.projLocation,
      OpenForApplication: this.isCheckedOpenForApplications,
      ExistingSkills: [selectedSkillsIDs],
      NewSkills: [this.newSelectedSkills],
      SkillCollections: [processedCollections],
    };

    console.log('Creating Project...\n');
    console.log(proj);

    // this.projectCrud.createProject(proj).subscribe((data) => {
    //   console.log('Response for Create Project: ', data);
    // });

    this.cancel();
  }

  cancel() {
    this._router.navigate([`home`]);
  }

  // newlyAddedSkillDetected(allSelectedSkills: any) {
  //   var skillsRemainingInSelected = [];
  //   var res = false;

  //   for (var x = 0; x < allSelectedSkills.length; x++) {
  //     for (var z = 0; z < this.newSelectedSkills.length; z++) {
  //       if (allSelectedSkills[x].Name == this.newSelectedSkills[z].Name) {
  //         skillsRemainingInSelected.push(this.newSelectedSkills[z]);
  //         // this.newSelectedSkills.splice(z, 1);
  //         res = true;
  //       }
  //     }
  //   }

  //   console.log('\nREMAINING SKILLS');
  //   console.log(skillsRemainingInSelected);
  //   // update remaining skills selected:
  //   this.newSelectedSkills = skillsRemainingInSelected;

  //   return res;
  // }

  // removeUnselectedNewSkills(a: any[]) {
  //   console.log('\n=== X ====\n');
  //   console.log(a);

  //   var arrWithRemoved = [];

  //   for (var x = 0; x < a.length; x++) {
  //     for (var z = 0; z < this.newSelectedSkills.length; z++) {
  //       if (a[x].Name == this.newSelectedSkills[z].Name) {
  //         console.log('Removing ' + a[x]);
  //         arrWithRemoved.push(a[x]);
  //       }
  //     }
  //   }

  //   this.newSelectedSkills = arrWithRemoved;
  // }

  // addReselectedNewSkills(a: any[]) {
  //   console.log('\n=== X ====\n');

  //   var arrWithAdded = [];

  //   for (var x = 0; x < a.length; x++) {
  //     for (var z = 0; z < this.dropdownOptionsSkills.length; z++) {
  //       if (a[x].Name == this.dropdownOptionsSkills[z].Name) {
  //         console.log('Adding ' + a[x]);
  //         arrWithAdded.push(a[x]);
  //       }
  //     }
  //   }

  //   this.newSelectedSkills = arrWithAdded;
  // }
}
