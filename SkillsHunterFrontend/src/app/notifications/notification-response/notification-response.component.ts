import { NotificationItem } from './../notifications.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification-response',
  templateUrl: './notification-response.component.html',
  styleUrls: ['./notification-response.component.scss'],
})
export class NotificationResponseComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public card_notification: any) {}

  notificationResponseForm: FormGroup;

  ngOnInit(): void {
    this.notificationResponseForm = new FormGroup({
      notificationResponseMessage: new FormControl('', [Validators.required]),
    });
  }

  captureNotificationResponse() {
    console.log('Message sent!');
  }
}
