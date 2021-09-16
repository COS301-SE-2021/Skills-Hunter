import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Candidate } from '../classes/Candidate';
import { Project } from '../classes/Project';
import { AddSkillCategoryComponent } from '../createproject/add-skill-category/add-skill-category.component';
import { AddSkillCollectionComponent } from '../createproject/add-skill-collection/add-skill-collection.component';
import { CandidatesList } from '../mock-data/mock-candidates';
import { mockSkillCollection } from '../mock-data/mock-collection';
import { ProjectCRUDService } from '../services/project-crud.service';
import { projectService } from '../services/project-edit.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
})
export class UpdateProjectComponent implements OnInit {
  isLinear = true;
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
  dropdownOptionsSkills = [];
  dropdownOptionsCollections = [];

  configSkills = {
    displayKey: 'name', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search skills', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  configCollections = {
    displayKey: 'name', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Collections', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  projectBasicInfo = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    projectDescription: new FormControl('', [Validators.required]),
    projectLocation: new FormControl('', [Validators.required]),
  });

  projectSkillsAndCollections = new FormGroup({
    projectSkills: new FormControl('', [Validators.required]),
    projectCollections: new FormControl('', [Validators.required]),
  });

  extractSelectedSkills() {
    var arr = [];

    return arr;
  }

  extractSelectedCollections() {
    var arr = [];

    return arr;
  }

  ngOnInit(): void {
    this.projectBasicInfo.controls['projectName'].setValue(
      this.selected_project.name
    );
    this.projectBasicInfo.controls['projectDescription'].setValue(
      this.selected_project.description
    );
    this.projectBasicInfo.controls['projectLocation'].setValue(
      this.selected_project.location
    );

    this.selectedSkills = this.extractSelectedSkills();
    this.selectedCollections = this.extractSelectedCollections();

    this.projectCrud.getSkills().subscribe((data) => {
      // Capture the array of Skill objects:
      this.dropdownOptionsSkills = data[Object.keys(data)[0]];
    });

    this.projectCrud.getCollections().subscribe((data) => {
      this.dropdownOptionsCollections = data;
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public selected_project: any,
    private _router: Router,
    private dialog: MatDialog,
    private projectCrud: ProjectCRUDService,
    private _snackBar: MatSnackBar
  ) {}

  addSkill() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '45%';
    configDialog.panelClass = 'custom-modalbox';
    const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);

    dialogRef.afterClosed().subscribe((skill) => {
      if (skill != undefined) {
        this.selectedSkills.push(skill.data);
        this.newSelectedSkills.push(skill.data);
        this.dropdownOptionsSkills.push(skill.data);
      } else console.log('Returned Empty Skill');
    });
  }

  addCollection() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '45%';
    configDialog.panelClass = 'custom-modalbox';
    const dialogRef = this.dialog.open(
      AddSkillCollectionComponent,
      configDialog
    );

    dialogRef.afterClosed().subscribe((collection) => {
      if (collection != undefined) {
        this.selectedCollections.push(collection.data);
        mockSkillCollection.push(collection.data);
      } else console.log('Returned Empty Collection');
    });
  }

  changeDetectedSkills(allSelectedSkills: any) {
    // detect changes in selecting new and old skills
    var arrNew = [];
    var arr: any[] = allSelectedSkills.value;

    for (var x = 0; x < arr.length; x++) {
      if (arr[x].skillId == undefined) {
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
    this.selectedCollections = a.value;
  }

  extractSkillId(a: any[], b: any[]) {
    var dupp = false;
    var selectedSkillsIDs = [];

    // Process the existing skills:
    for (var x = 0; x < a.length; x++) {
      dupp = false;
      for (var y = 0; y < b.length; y++) {
        if (a[x].skillId == b[y].skillId) {
          dupp = true;
          break;
        }
      }

      if (!dupp)
        selectedSkillsIDs.push({
          skillId: a[x].skillId,
          weight: 0,
        });
    }
    return selectedSkillsIDs;
  }

  updateTheProject() {
    var processedCollections = [];

    var selectedSkillsIDs = this.extractSkillId(
      this.selectedSkills,
      this.newSelectedSkills
    );

    console.log('Consoling the Skills with IDs:');
    console.log(selectedSkillsIDs);

    // Process the collections:
    for (var x = 0; x < this.selectedCollections.length; x++) {
      var extractCollectionSkillsId = [];

      if (this.selectedCollections[x].skills != undefined)
        for (var q = 0; q < this.selectedCollections[x].skills.length; q++) {
          extractCollectionSkillsId.push({
            skillId: this.selectedCollections[x].skills[q].skillId,
            weight: 0,
          });
        }

      processedCollections.push({
        name: this.selectedCollections[x].name,
        description: this.selectedCollections[x].description,
        weight: this.selectedCollections[x].weight,
        skills: extractCollectionSkillsId,
      });
    }

    // Create the Project:
    var proj = {
      name: this.projectBasicInfo.controls['projectName'].value,
      description: this.projectBasicInfo.controls['projectDescription'].value,
      location: this.projectBasicInfo.controls['projectLocation'].value,
      openForApplication: this.isCheckedOpenForApplications,
      existingSkills: selectedSkillsIDs,
      newSkills: this.newSelectedSkills,
      skillCollections: processedCollections,
    };

    console.log('Updating Project...\n');
    console.log(proj);

    // theProject[0].name = proj.name;
    // theProject[0].description = proj.description;
    // theProject[0].location = proj.location;

    // this._snackBar.open('Project Successfully Updated!', '', {
    //   duration: 3000,
    // });

    this.projectCrud.updateProject(proj).subscribe((data) => {
      console.log('Response for Update Project: ', data);

      if (data.projectId != undefined)
        this._snackBar.open('Project Successfully Updated!', '', {
          duration: 3000,
        });
      else {
        this._snackBar.open('Project Update Failed!', '', {
          duration: 3000,
        });
      }
    });

    // theProject[0].name = proj.name;

    // theProject.pop();
    // theProject.push(proj);
    this.dialog.closeAll();

    this.cancel();
  }

  cancel() {
    // this.dialog.closeAll();
    this._router.navigate([`home`]);
  }
}
