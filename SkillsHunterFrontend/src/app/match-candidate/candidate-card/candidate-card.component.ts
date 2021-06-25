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
  @Input() card_candidate: Candidate;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  inviteCandidate(){
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '35%';
    configDialog.height = '30%';
    this.dialog.open(InviteCandidateComponent, configDialog);
  }


}
