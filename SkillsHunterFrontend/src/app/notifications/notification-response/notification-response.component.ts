import { NotificationItem } from './../notifications.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-response',
  templateUrl: './notification-response.component.html',
  styleUrls: ['./notification-response.component.scss'],
})
export class NotificationResponseComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public card_notification: any,
    public dialogRef: MatDialogRef<NotificationResponseComponent>,
    private _snackBar: MatSnackBar
  ) {}

  notificationResponseForm: FormGroup;

  ngOnInit(): void {
    this.notificationResponseForm = new FormGroup({
      notificationResponseMessage: new FormControl('', [Validators.required]),
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  captureNotificationResponse() {
    var message = 'Message Sent!';
    this._snackBar.open(message, '', { duration: 3000 });
    this.cancel();
  }
}
