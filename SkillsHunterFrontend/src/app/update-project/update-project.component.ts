import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Candidate } from '../classes/Candidate';
import { Collection } from '../classes/Collection';
import { Project } from '../classes/Project';
import { Skill } from '../classes/Skill';
import { AddSkillCategoryComponent } from '../createproject/add-skill-category/add-skill-category.component';
import { AddSkillCollectionComponent } from '../createproject/add-skill-collection/add-skill-collection.component';
import { CandidatesList } from '../mock-data/mock-candidates';
import { Collections } from '../mock-data/mock-collections';
import { Projects } from '../mock-data/mock-projects';
import { Skills } from '../mock-data/mock-skills';
import { ProjectCRUDService } from '../services/project-crud.service';
import { projectService } from '../services/project-edit.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
})
export class UpdateProjectComponent implements OnInit {
  title: string = 'Candidate';

  projectBasicInfo: FormGroup;
  projectSkillsAndCollections: FormGroup;

  dropdownListForSkills = [];
  selectedItemsForSkills = [];
  dropdownListForCollections = [];

  existingSkillsArray = [];
  selectedItemsForCollections = [];
  newSkillsArray = [];

  existingCollectionsArray = [];
  newCollectionsArray = [];

  editingProjectSkills = [];
  editingProjectCollections = [];

  dropdownSettings: IDropdownSettings;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public projectToUpdate: any
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

    this.projectBasicInfo.controls['projectName'].setValue(
      this.projectToUpdate.selectedProject.Name
    );
    this.projectBasicInfo.controls['projectDescription'].setValue(
      this.projectToUpdate.selectedProject.Description
    );

    this.editingProjectSkills = this.projectToUpdate.selectedProject.Skill;
    this.editingProjectCollections = this.projectToUpdate.selectedProject.Skill;
    // this.editingProjectCollections = this.projectToUpdate.selectedProject.Collections;

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

      // this.selectedObjectsSkills.push(obj);

      this.existingSkillsArray.push(obj);
    } else if (occurance[0] == 1) {
      // process collection:
      var col = new Collection();
      col.CollectionId = Collections[occurance[1]].CollectionId;
      col.CollectionName = Collections[occurance[1]].CollectionName;
      col.Skills = Collections[occurance[1]].Skills;

      // this.selectedObjectsCollections.push(col);
      this.existingCollectionsArray.push(col);
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
        var obj = new Skill();
        obj.SkillId = skill.data.SkillId;
        obj.SkillName = skill.data.SkillName;
        obj.SkillWeight = skill.data.SkillWeight;

        Skills.push(obj);

        // this.selectedObjectsSkills.push(obj);
        this.newSkillsArray.push(obj);

        this.dropdownListForSkills = [];

        var sel = {
          item_id: obj.SkillId,
          item_text: obj.SkillName,
        };

        // this.onItemSelect(sel);

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
        var obj = new Collection();
        obj.CollectionId = collection.data.CollectionId;
        obj.CollectionName = collection.data.CollectionName;
        obj.Skills = collection.data.Skills;

        Collections.push(obj);

        // this.selectedObjectsCollections.push(obj);
        this.newCollectionsArray.push(obj);

        this.dropdownListForCollections = [];

        var sel = {
          item_id: obj.CollectionId,
          item_text: obj.CollectionName,
        };

        // this.onItemSelect(sel);

        this.ngOnInit();
      } else console.log('Returned Empty');
    });
  }

  createTheProject() {
    var proj = new Project();
    proj.ProjectId = this.projectToUpdate.selectedProject.ProjectId;
    proj.Name = this.projectBasicInfo.value.projectName;
    proj.Description = this.projectBasicInfo.value.projectDescription;
    proj.Owner = 'New Developers';
    proj.Location = 'Hatfield';

    console.log('Creating Project!\n');

    // proj.Skill.push('Hi');

    console.log(this.newCollectionsArray);
    console.log(this.existingSkillsArray);
    console.log(this.newCollectionsArray);
    console.log(this.existingCollectionsArray);

    // proj.Skill.push('SKILLS!');
    // if (this.selectedObjectsSkills != undefined) {
    //   if (this.selectedObjectsSkills.length > 0) {
    //     proj.Skill.push(JSON.stringify(this.selectedObjectsSkills));
    //   }
    // }

    // for (var x = 0; x < this.selectedObjectsCollections.length; x++) {
    //   if (this.selectedObjectsCollections != undefined) {
    //     if (this.selectedObjectsCollections[x].Skills != undefined) {
    //       proj.Skill.push(
    //         JSON.stringify(this.selectedObjectsCollections[x].Skills)
    //       );
    //     }
    //   }
    // }

    proj.OpenForApplication = false;

    for (var x = 0; x < Projects.length; x++) {
      if (Projects[x].ProjectId == proj.ProjectId) {
        console.log('INSIDE');
        // Projects.splice(x, 0, proj);
        Projects.splice(x, 1);
        Projects.push(proj);
      } else {
        console.log('FAILED ' + x);
      }
    }

    console.log('Showing the projects');

    console.log(Projects);

    // Projects.push(proj);
    console.log('Created Project!');
    // console.log(proj);
    this.cancel();
  }

  cancel() {
    this._router.navigate([`home`]);
  }

  // candidatesList: Candidate[] = CandidatesList;

  // constructor(
  //   public dialogRef: MatDialogRef<UpdateProjectComponent>,
  //   private projectCrud: ProjectCRUDService,
  //   private projectData: projectService
  // ) {}

  // get getProjectInfo(): Project {
  //   return this.projectData.projectBeingedited;
  // }

  // skills: string[] = [
  //   'Project Manager',
  //   'C++',
  //   'Java',
  //   'JavaScript',
  //   'Angular',
  //   'DotNet Core',
  // ];
  // industries: string[] = ['Finance', 'Construction', 'Agriculture', 'IT'];
  // open: string[] = ['Yes', 'No'];

  // ngOnInit(): void {
  //   this.projectInfo.controls['projectName'].setValue(this.getProjectInfo.Name);
  //   this.projectInfo.controls['description'].setValue(
  //     this.getProjectInfo.Description
  //   );
  //   this.projectInfo.controls['skill'].setValue(
  //     this.getProjectInfo.Skill.slice()
  //   );
  //   this.projectInfo.controls['openForApplication'].setValue('Yes');
  // }

  // projectInfo: FormGroup = new FormGroup({
  //   projectName: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required]),
  //   skill: new FormControl('', [Validators.required]),
  //   openForApplication: new FormControl('', [Validators.required]),
  // });

  // //when submit is clicked this function is called to send info to service
  // onSubmit() {
  //   var formData = new Project();
  //   formData.ProjectId = this.getProjectInfo.ProjectId;
  //   formData.Name = <string>(
  //     (<any>this.projectInfo.controls['projectName'].value)
  //   );
  //   formData.Description = <string>(
  //     (<any>this.projectInfo.controls['description'].value)
  //   );
  //   formData.Skill = <string[]>(<any>this.projectInfo.controls['skill'].value);
  //   if (
  //     <string>(<any>this.projectInfo.controls['openForApplication'].value) ==
  //     'yes'
  //   ) {
  //     formData.OpenForApplication = true;
  //   } else {
  //     formData.OpenForApplication = true;
  //   }

  //   //set new info on the card(replace old info with new after submit is clicked)
  //   this.getProjectInfo.Name = formData.Name;
  //   this.getProjectInfo.Description = formData.Description;
  //   this.getProjectInfo.Skill = formData.Skill;
  //   this.getProjectInfo.OpenForApplication = formData.OpenForApplication;

  //   //the service is called below
  //   this.projectCrud
  //     .updateProject(formData) //change so it calls update
  //     .subscribe((data) => {
  //       console.log('Response post', data);
  //     });

  //   this.dialogRef.close();
  // }

  // //close dialog popup
  // cancel() {
  //   this.dialogRef.close();
  // }
}
