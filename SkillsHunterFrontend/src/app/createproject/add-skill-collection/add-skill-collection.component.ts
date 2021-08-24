import { SkillCollection } from 'src/app/classes/SkillCollection';
import { mockSkillCollection } from './../../mock-data/mock-collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from 'src/app/classes/Skill';
import { Skills } from 'src/app/mock-data/mock-skills';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skill-collection',
  templateUrl: './add-skill-collection.component.html',
  styleUrls: ['./add-skill-collection.component.scss'],
})
export class AddSkillCollectionComponent implements OnInit {
  collectionArray: SkillCollection[] = mockSkillCollection;

  collectionName: string;
  collectionWeight: number = 1;
  collectionSkills: [];

  skillArray = Skills;

  collectionFormGroup: FormGroup;

  formatLabel(value: number) {
    return value;
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSkillCollectionComponent>
  ) {}

  ngOnInit(): void {
    this.collectionFormGroup = this.formBuilder.group({
      collectionName: ['', Validators.required],
      // collectionDescription: ['', Validators.required],
    });
  }

  captureCollection() {
    var collection = {
      Name: this.collectionFormGroup.value.collectionName,
      Description: this.collectionFormGroup.value.collectionDescription,
      Weight: this.collectionWeight,
      Skills: this.collectionSkills,
    };

    this.dialogRef.close({ data: collection });
  }

  cancel() {
    this.dialogRef.close();
  }
}
