import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-project-advanced-search',
  templateUrl: './project-advanced-search.component.html',
  styleUrls: ['./project-advanced-search.component.scss']
})
export class ProjectAdvancedSearchComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
