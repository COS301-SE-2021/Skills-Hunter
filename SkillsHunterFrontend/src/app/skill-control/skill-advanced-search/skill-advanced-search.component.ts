import { Component, OnInit, Inject } from '@angular/core';
import { advancedOptions } from '../skill-control.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../classes/Category';
import { mockCategoryData } from '../../mock-data/mock-category';

@Component({
  selector: 'app-skill-advanced-search',
  templateUrl: './skill-advanced-search.component.html',
  styleUrls: ['./skill-advanced-search.component.scss']
})
export class SkillAdvancedSearchComponent implements OnInit {
  Categories: Category[] = mockCategoryData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: advancedOptions) { }

  ngOnInit(): void {
  }

}
