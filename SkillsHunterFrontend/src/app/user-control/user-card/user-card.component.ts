import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { User } from '../../classes/User';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ShowSkillsComponent } from '../show-skills/show-skills.component';
import { getUserResponse } from 'src/app/api-message-class/message';
import { AdminService } from 'src/app/services/admin.service';

export interface DialogData{
  url: string;
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: getUserResponse;
  imageUrl: string;
  userTypes:String[] = ["Candidate","Project Owner","Organisation","Admin"];
  @Output() onDeleteUser: EventEmitter<getUserResponse> = new EventEmitter();
  
  constructor(public dialog: MatDialog,private adminService:AdminService) {
    
   }

  ngOnInit(): void {
    this.setImageUrl();
  }

  onDelete(user): void{
    this.onDeleteUser.emit(user);
  }

  displayImage(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '35%';
    configDialog.height = '70%';
    configDialog.data = {url: this.imageUrl};

    const dialogRef = this.dialog.open(ImageDisplayComponent,configDialog);
  }

  showSkills(): void{
    
    this.adminService.getUserSkills(this.user.userId).subscribe(result =>{
      const configDialog = new MatDialogConfig();
      configDialog.backdropClass = 'backGround';
      configDialog.width = '50%';
      configDialog.height = '70%';
      configDialog.data = result;
  
      const dialogRef = this.dialog.open(ShowSkillsComponent,configDialog);  
    });   
  }

  setImageUrl(): void{
    this.adminService.getImage(this.user.userId).subscribe(result=>{
      this.imageUrl = this.adminService.getApiUrl() + result.result.path;
      console.log(this.imageUrl);
    },
    (error)=>{
      this.imageUrl = "../../assets/images/hou-china-6.jpg";
    });
  }

}
