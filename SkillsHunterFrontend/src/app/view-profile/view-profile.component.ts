import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,private user: AdminService) { }

  imageUrl = "/assets/images/profile.png";
  ngOnInit(): void {
 
    if(this.data!=""){
      console.log("in slider: "+this.data);
    
  this.user.getUser(this.data.id)
  .subscribe(
    data=>{
     
      console.log('Response post', data);
     
    }
  );
    }
  }

}
