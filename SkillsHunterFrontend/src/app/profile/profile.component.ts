import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileInfoService } from '../services/profile-info.service';
import { MatDialogRef,MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageUrl: string = "/assets/images/profile.png";
  fileToUpload: File = null;

  constructor(private imgService: ProfileInfoService,private dialog: MatDialog) { }

  ngOnInit(): void {
    localStorage.setItem('name','Emmanuel');
    localStorage.setItem('surname','Khoza');
    localStorage.setItem('email','emma@mail.com');
    localStorage.setItem('phone','0630000000');

    this.personalDetailsForm.controls['name'].setValue(localStorage.getItem('name'));
    this.personalDetailsForm.controls['surname'].setValue(localStorage.getItem('surname'));
    this.personalDetailsForm.controls['email'].setValue(localStorage.getItem('email'));
    this.personalDetailsForm.controls['phone'].setValue(localStorage.getItem('phone'));

  }

  personalDetailsForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')]),
    password: new FormControl('', [Validators.required]),
  });


  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  upload(Image){

   this.imgService.postImg(this.fileToUpload).subscribe(
     data =>{
       console.log('done');
       Image.value = null;
       this.imageUrl = "/assets/img/default-image.png";
     }
   );
  }

  viewImg(){
 
    const configDialog = new MatDialogConfig();
    const dialogRef = this.dialog.open(ProfileImgComponent,
      {   width: '40%',
         height:'80%',
        data: { img: this.imageUrl}
      });
   // console.log("back");
    dialogRef.afterClosed().subscribe(data => {
   
      if(data !=undefined)
      {
        this.imageUrl=data.img;
      //return the skill and the value to profile then send request to backend
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
  }

  addskill(){
    const configDialog = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddSkillComponent,
      {   width: '40%',
         height:'80%'
      });
   // console.log("back");
    dialogRef.afterClosed().subscribe(returnedData => {
   
      if(returnedData !=undefined)
      {
        console.log("profile: "+returnedData.data.selectedSkill);
        console.log("rate: "+returnedData.data.datarateValue);
      //return the skill and the value to profile then send request to backend
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
  }
}
