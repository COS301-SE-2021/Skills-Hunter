import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-advanced-search',
  templateUrl: './user-advanced-search.component.html',
  styleUrls: ['./user-advanced-search.component.scss']
})
export class UserAdvancedSearchComponent implements OnInit {
  Usertype:any[] =  [{
              text: "Candidate",
              value: 0
              },
            {
              text: "Project Owner",
              value: 1
            },
            {
              text: "Organisation",
              value:2
            }, 
            {
              text: "Admin",
              value: 3
            }];
  constructor(@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
  }

}
