import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/classes/admin';
import { advancedOptions } from '../skill-management.component';

@Component({
  selector: 'app-skill-advanced-search',
  templateUrl: './skill-advanced-search.component.html',
  styleUrls: ['./skill-advanced-search.component.scss']
})
export class SkillAdvancedSearchComponent implements OnInit {

  Categories: Category[] ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: advancedOptions) { }

  ngOnInit(): void {
  }

}
