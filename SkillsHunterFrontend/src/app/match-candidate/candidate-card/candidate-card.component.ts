import { InviteCandidateComponent } from './invite-candidate/invite-candidate.component';
import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from 'src/app/classes/Candidate';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
  @Input() card_candidate: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  inviteCandidate() {
    console.log('\nInviting a Candidate\n');
    console.log(this.card_candidate);

    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '35%';
    configDialog.panelClass = 'custom-modalbox';

    // this.dialog.open(InviteCandidateComponent, configDialog);
  }
}
