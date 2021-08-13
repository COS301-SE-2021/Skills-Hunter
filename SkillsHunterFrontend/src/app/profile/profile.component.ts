import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileInfoService } from '../services/profile-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageUrl: string = "/assets/images/profile.png";
  fileToUpload: File = null;

  constructor(private imgService: ProfileInfoService) { }

  ngOnInit(): void {
    localStorage.setItem('name',data.body.name);
    localStorage.setItem('surname',data.body.surname);
    localStorage.setItem('name',data.body.name);
    localStorage.setItem('surname',data.body.surname);

    this.personalDetailsForm.controls['name'].setValue(this.getProjectInfo.name);
    this.personalDetailsForm.controls['name'].setValue(this.getProjectInfo.name);
    this.personalDetailsForm.controls['name'].setValue(this.getProjectInfo.name);
    this.personalDetailsForm.controls['name'].setValue(this.getProjectInfo.name);

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
}
