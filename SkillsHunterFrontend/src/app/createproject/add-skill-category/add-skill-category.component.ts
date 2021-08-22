import { Category } from './../../classes/Category';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxDefaultOptions,
} from '@angular/material/checkbox';
import { Skill } from 'src/app/classes/Skill';
import { Skills } from 'src/app/mock-data/mock-skills';
import { MatDialogRef } from '@angular/material/dialog';
import { mockCategoryData } from 'src/app/mock-data/mock-category';
@Component({
  selector: 'app-add-skill-category',
  templateUrl: './add-skill-category.component.html',
  styleUrls: ['./add-skill-category.component.scss'],
})
export class AddSkillCategoryComponent implements OnInit {
  skillName: string;
  skillWeight: number = 1;
  skillCategory: Category[];

  categoryArray = mockCategoryData;

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
    });
  }

  captureSkill() {
    // process categories:
    var categoriesID = [];
    for (var x = 0; x < this.skillCategory.length; x++) {
      categoriesID.push({ CategoryID: this.skillCategory[x].categoryid });
    }

    var skill = {
      SkillId: (Skills.length + 1).toString(), // WILL REQUIRE CHANGE AFTER BACKEND FUNCTION IS IMPLEMENTED:
      Name: this.skillFormGroup.value.skillName,
      Categories: categoriesID,
      Weight: this.skillWeight,
    };

    this.dialogRef.close({ data: skill });
  }

  cancel() {
    this.dialogRef.close();
  }
}
