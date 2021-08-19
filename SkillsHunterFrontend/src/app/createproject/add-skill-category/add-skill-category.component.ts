import { Category } from './../../classes/Category';
import { Collection } from 'src/app/classes/Collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxDefaultOptions,
} from '@angular/material/checkbox';
import { Skill } from 'src/app/classes/Skill';
import { Skills } from 'src/app/mock-data/mock-skills';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryList } from 'src/app/mock-data/mock-categories';

@Component({
  selector: 'app-add-skill-category',
  templateUrl: './add-skill-category.component.html',
  styleUrls: ['./add-skill-category.component.scss'],
})
export class AddSkillCategoryComponent implements OnInit {
  skillName: string;
  skillWeight: number = 1;
  skillCategory: Category[];

  categoryArray = CategoryList;

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
    var skill = new Skill();

    skill.SkillId = (Skills.length + 1).toString();
    skill.SkillName = this.skillName;
    skill.SkillWeight = this.skillWeight;
    skill.SkillCategory = this.skillCategory;

    this.dialogRef.close({ data: skill });
  }

  cancel() {
    this.dialogRef.close();
  }
}
