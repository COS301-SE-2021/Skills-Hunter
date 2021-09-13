import { NotificationItem } from './../notifications.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification-response',
  templateUrl: './notification-response.component.html',
  styleUrls: ['./notification-response.component.scss'],
})
export class NotificationResponseComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public card_notification: any,
    public dialogRef: MatDialogRef<NotificationResponseComponent>
  ) {}

  notificationResponseForm: FormGroup;

  ngOnInit(): void {
    this.notificationResponseForm = new FormGroup({
      notificationResponseMessage: new FormControl('', [Validators.required]),
    });
  }

  //   this.dialogRef.close({ data: collection });
  // }

  cancel() {
    this.dialogRef.close();
  }

  captureNotificationResponse() {
    console.log('Message sent!');
    this.cancel();
  }
}
