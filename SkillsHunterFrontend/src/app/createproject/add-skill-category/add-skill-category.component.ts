import { Collection } from 'src/app/classes/Collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxDefaultOptions,
} from '@angular/material/checkbox';
import { Skill } from 'src/app/classes/Skill';
import { Collections } from 'src/app/mock-data/mock-collections';
import { Skills } from 'src/app/mock-data/mock-skills';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skill-category',
  templateUrl: './add-skill-category.component.html',
  styleUrls: ['./add-skill-category.component.scss'],
})
export class AddSkillCategoryComponent implements OnInit {
  skillName: string;
  skillWeight: number = 1;
  skillCollection: string[];

  // collectionArray = ["Front-End", "Back-End", "Mobile App", "Desktop App"];

  collectionArray = Collections;

  skillFormGroup: FormGroup;

  formatLabel(value: number) {
    return value;
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSkillCategoryComponent>
  ) {}

  ngOnInit(): void {
    this.skillFormGroup = this.formBuilder.group({
      skillName: ['', Validators.required],
      // categoryWeight : ['', Validators.required],
      // categorySkills : ['', Validators.required]
    });
  }

  captureSkill() {
    console.log(this.skillName + '\n');
    console.log(this.skillWeight + '\n');
    console.log(this.skillCollection + '\n');

    var skill = new Skill();

    // ski.SkillId = "random-id"+this.skillCollection.length;
    skill.SkillId = (Skills.length + 1).toString();
    skill.SkillName = this.skillName;
    skill.SkillWeight = this.skillWeight;

    console.log('Skill is = ' + JSON.stringify(skill));

    // Skills.push(ski);
    this.dialogRef.close({ data: skill });
  }

  // cancel(){
  //   this.dialogRef.close();
  // }
}
