import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-skill-category',
  templateUrl: './add-skill-category.component.html',
  styleUrls: ['./add-skill-category.component.scss']
})
export class AddSkillCategoryComponent implements OnInit {

  category: FormGroup;

  constructor(fb: FormBuilder) {
    this.category = fb.group({
      FrontEnd: false,
      BackEnd: false,
      Mobile: false,
      Desktop: false
    });
  }

  ngOnInit(): void {
  }

  panelOpenState = false;

  addSKill(){

  }
  
  cancel(){

  }
}
