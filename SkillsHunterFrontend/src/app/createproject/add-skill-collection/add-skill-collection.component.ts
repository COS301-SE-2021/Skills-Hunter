import { Collection } from './../../classes/Collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Collections } from 'src/app/mock-data/mock-collections';
import { Skill } from 'src/app/classes/Skill';
import { Skills } from 'src/app/mock-data/mock-skills';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skill-collection',
  templateUrl: './add-skill-collection.component.html',
  styleUrls: ['./add-skill-collection.component.scss'],
})
export class AddSkillCollectionComponent implements OnInit {
  collectionArray: Collection[] = Collections;

  collectionName: string;
  collectionWeight: number = 1;
  collectionSkills: Skill[];

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
      // collectionWeight : ['', Validators.required],
      // collectionSkills : ['', Validators.required]
    });
  }

  captureCollection() {
    var collection = new Collection();

    collection.CollectionId = (Collections.length + 1).toString();
    collection.CollectionName = this.collectionName;
    collection.Skills = this.collectionSkills;

    this.dialogRef.close({ data: collection });
  }

  cancel() {
    this.dialogRef.close();
  }
}
