import { ProjectCRUDService } from './../../../services/project-crud.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invite-candidate',
  templateUrl: './invite-candidate.component.html',
  styleUrls: ['./invite-candidate.component.scss'],
})
export class InviteCandidateComponent implements OnInit {
  ngOnInit(): void {
    this.projService.getMyUserID().subscribe((uID) => {
      this.userID = uID;
      console.log(this.userID);
    });
  }

  constructor(
    public dialogRef: MatDialogRef<InviteCandidateComponent>,
    private projService: ProjectCRUDService,
    @Inject(MAT_DIALOG_DATA) public SendInviteData,
    private _snackBar: MatSnackBar
  ) {}

  userID: any;

  invitationForm: FormGroup = new FormGroup({
    candidateMessage: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    var userID: any;
    this.projService.getMyUserID().subscribe((uID) => {
      userID = uID;
    });

    var formData = {
      userId: userID,
      projectId: this.SendInviteData.projectId,
      inviteeId: this.SendInviteData.inviteeId,
      message: this.invitationForm.value.candidateMessage,
    };

    console.log('About to Invite the Candidate!');
    console.log(formData);

    this.projService.inviteCandidate(formData).subscribe((data) => {
      if (data[Object.keys(data)[0]] == true)
        this._snackBar.open('Successfully Applied for Project!', '', {
          duration: 3000,
        });
      else {
        this._snackBar.open('Project Application Failed.', '', {
          duration: 3000,
        });
      }
      console.log('Response: ', data);
    });

    this.cancel();
  }

  //close dialog popup
  cancel() {
    this.dialogRef.close();
  }
}
