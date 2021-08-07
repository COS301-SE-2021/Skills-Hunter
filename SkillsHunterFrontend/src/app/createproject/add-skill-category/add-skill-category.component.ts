import { Collection } from 'src/app/classes/Collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { Skill } from 'src/app/classes/Skill';

@Component({
  selector: 'app-add-skill-category',
  templateUrl: './add-skill-category.component.html',
  styleUrls: ['./add-skill-category.component.scss']
})
export class AddSkillCategoryComponent implements OnInit {

  skillName : string;
  skillWeight : number = 1;
  skillCollection : string[];

  collectionArray = ["Front-End", "Back-End", "Mobile App", "Desktop App"];

  skillFormGroup : FormGroup;

  formatLabel(value: number) {
    return value;
  }

  constructor(private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.skillFormGroup = this.formBuilder.group(
      {
        skillName : ['', Validators.required],
        // categoryWeight : ['', Validators.required],
        // categorySkills : ['', Validators.required]
      }
    );
  }

  captureSkill(){
    console.log(this.skillName+"\n");
    console.log(this.skillWeight+"\n");
    console.log(this.skillCollection+"\n");
  }
  
  cancel(){

  }
}
