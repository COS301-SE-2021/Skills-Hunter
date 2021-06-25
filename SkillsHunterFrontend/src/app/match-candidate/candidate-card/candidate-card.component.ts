import { InviteCandidateComponent } from './invite-candidate/invite-candidate.component';
import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from 'src/app/classes/Candidate';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectCRUDService } from 'src/app/services/project-crud.service';
// import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
  @Input() card_candidate: Candidate;

  constructor(private dialog: MatDialog,private candidateOperations: ProjectCRUDService) {}

  ngOnInit(): void {}

  inviteCandidate(){
    
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '43%';
    configDialog.height = '60%';
    this.dialog.open(InviteCandidateComponent, configDialog);
    
  }
}
