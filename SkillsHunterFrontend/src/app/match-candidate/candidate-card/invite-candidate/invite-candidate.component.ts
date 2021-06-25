import { ProjectCRUDService } from './../../../services/project-crud.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-candidate',
  templateUrl: './invite-candidate.component.html',
  styleUrls: ['./invite-candidate.component.scss']
})
export class InviteCandidateComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<InviteCandidateComponent>, private projService: ProjectCRUDService) {}

  invitationForm: FormGroup = new FormGroup({
    candidateMessage: new FormControl('', [Validators.required])
  });

  onSubmit() {


    var formData = {
      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "projectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "inviteeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "message": "string"
    }

    formData.message = <string>(
      (<any>this.invitationForm.controls['candidateMessage'].value)
    );
    
    this.projService.inviteCandidate(formData).subscribe((data) => {
      console.log('Candidate was invited...');
      console.log('Response: ', data);
    });

    this.dialogRef.close();
    // this.cancel();
  }

  //close dialog popup
  cancel() {
    this.dialogRef.close();
  }


}
