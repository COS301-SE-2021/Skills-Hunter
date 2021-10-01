import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InviteComponent } from '../invite/invite.component';

@Component({
  selector: 'app-match-candidates',
  templateUrl: './match-candidates.component.html',
  styleUrls: ['./match-candidates.component.scss']
})
export class MatchCandidatesComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '50%',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


  ngOnInit(): void {
  }
}
