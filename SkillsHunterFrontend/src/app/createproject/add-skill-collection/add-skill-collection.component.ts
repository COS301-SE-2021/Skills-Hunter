import { SkillCollection } from 'src/app/classes/SkillCollection';
import { mockSkillCollection } from './../../mock-data/mock-collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from 'src/app/classes/Skill';
import { Skills } from 'src/app/mock-data/mock-skills';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectCRUDService } from 'src/app/services/project-crud.service';

@Component({
  selector: 'app-add-skill-collection',
  templateUrl: './add-skill-collection.component.html',
  styleUrls: ['./add-skill-collection.component.scss'],
})
export class AddSkillCollectionComponent implements OnInit {
  // collectionArray: SkillCollection[] = mockSkillCollection;
  collectionArray = [];
  collectionWeight: number = 1;
  collectionSkills = [];

  // collectionDescription = 'An undescribed collection of skills.';

  skillArray = [];

  collectionFormGroup: FormGroup;

  formatLabel(value: number) {
    return value;
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSkillCollectionComponent>,
    private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {
    this.collectionFormGroup = this.formBuilder.group({
      collectionName: ['', Validators.required],
      collectionDescription: ['', Validators.required],
    });

    this.projectCrud.getSkills().subscribe((data) => {
      // Capture the array of Skill objects:
      this.skillArray = data[Object.keys(data)[0]];
    });

    this.projectCrud.getCollections().subscribe((data) => {
      console.log(data);
      this.collectionArray = data;
    });
  }

  captureCollection() {
    var collection = {
      name: this.collectionFormGroup.value.collectionName,
      description: this.collectionFormGroup.value.collectionDescription,
      weight: this.collectionWeight,
      skills: this.collectionSkills,
    };

    this.dialogRef.close({ data: collection });
  }

  cancel() {
    this.dialogRef.close();
  }
}
