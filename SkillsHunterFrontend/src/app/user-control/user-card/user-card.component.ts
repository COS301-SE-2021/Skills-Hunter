import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { User } from '../../classes/User';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ShowSkillsComponent } from '../show-skills/show-skills.component';

export interface DialogData{
  url: string;
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  userTypes:String[] = ["Candidate","Project Owner","Organisation","Admin"];
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDelete(user): void{
    this.onDeleteUser.emit(user);
  }

  displayImage(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '35%';
    configDialog.height = '70%';
    configDialog.data = {url: 'https://material.angular.io/assets/img/examples/shiba1.jpg'};

    const dialogRef = this.dialog.open(ImageDisplayComponent,configDialog);
  }

  showSkills(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '35%';
    configDialog.height = '70%';
    configDialog.data = this.user.id;

    const dialogRef = this.dialog.open(ShowSkillsComponent,configDialog);    
  }

}
