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
 
  userData;
  imageUrl = "/assets/images/profile.png";
  linkedIn;
  github;
  ngOnInit(): void {
 
    if(this.data!=""){
      //console.log("in slider: "+this.data);
  //retrieve user details
  this.user.getUser(this.data.id)
  .subscribe(
    data=>{
     
      console.log('Response post', data.name);
      this.userData=data;
      if(this.userData.linkedIn==null){
        this.linkedIn="#";
        document.getElementById("linked").style.display = 'none';
      }else{

        this.linkedIn=this.userData.linkedIn;
      }
      
      if(this.userData.github==null){
        this.github="#";
        document.getElementById("github").style.display = 'none';
      }else{

        this.github=this.userData.github;
      }
    }
  );
    }
  }

}
