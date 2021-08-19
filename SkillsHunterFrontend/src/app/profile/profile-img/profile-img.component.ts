import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileInfoService } from './../../services/profile-info.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.scss']
})
export class ProfileImgComponent implements OnInit {

  imageUrl: string;// = "/assets/images/profile.png";
  fileToUpload: File = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {img: string},private imgService: ProfileInfoService,public dialogRef: MatDialogRef<ProfileImgComponent>) { }

  ngOnInit(): void {
    this.imageUrl=this.data.img;
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
      console.log("in upload: "+event.target.result);
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  upload(Image){

    //send img to backend
    this.imgService.postImg(this.fileToUpload).subscribe(
      data =>{
        console.log('done');
        Image.value = null;
        this.imageUrl = "/assets/img/default-image.png";
      }
    );

    console.log("img: "+Image);
    this.dialogRef.close({img:this.imageUrl});
  }
}
