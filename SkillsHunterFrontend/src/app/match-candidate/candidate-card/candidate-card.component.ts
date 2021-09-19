import { InviteCandidateComponent } from './invite-candidate/invite-candidate.component';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
  @Input() card_candidate: any;
  @Input() selected_project: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  inviteCandidate(_candidateId: any) {
    var _data = {
      projectId: this.selected_project,
      inviteeId: _candidateId,
    };

    const configDialog = new MatDialogConfig();
    configDialog.panelClass = 'custom-modalbox';
    configDialog.data = _data;

    this.dialog.open(InviteCandidateComponent, configDialog);
  }
}
