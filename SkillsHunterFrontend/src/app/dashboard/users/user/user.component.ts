import { Component, OnInit, Input } from '@angular/core';
import { getUserResponse } from 'src/app/api-message-class/message';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: getUserResponse;
  imageUrl: string;

  constructor(private adminService:AdminService) { 
  }

  ngOnInit(): void {
    this.setImageUrl();
  }

  setImageUrl(): void{
    this.adminService.getImage(this.user.userId).subscribe(result=>{
      if(result.result != null)
        this.imageUrl = this.adminService.getApiUrl() + result.result.path;
      else{
        this.imageUrl = "assets/images/profile.png";
      }
    },error=>{
      alert("error loading image");
    });
  }

}
