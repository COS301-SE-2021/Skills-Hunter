import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-advanced-search',
  templateUrl: './user-advanced-search.component.html',
  styleUrls: ['./user-advanced-search.component.scss']
})
export class UserAdvancedSearchComponent implements OnInit {
  SelectedUserType: string;
  Usertype: string[] = ["Candidate","Project Owner","Organisation","Admin"];
  constructor() { }

  ngOnInit(): void {
  }

}
