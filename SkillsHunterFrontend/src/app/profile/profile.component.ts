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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit(): void {

    this.personalDetailsForm.controls['name'].setValue(localStorage.getItem('name'));
    this.personalDetailsForm.controls['surname'].setValue(localStorage.getItem('surname'));
    this.personalDetailsForm.controls['email'].setValue(localStorage.getItem('email'));
    this.personalDetailsForm.controls['phone'].setValue(localStorage.getItem('phone'));
    this.personalDetailsForm.controls['open'].setValue(localStorage.getItem('openForWork'));
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
    open: new FormControl('')
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
    
    console.log("val: "+document.getElementById("toggleB"));
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
        console.log("rate: "+returnedData.data.rateValue);
        this.noElements++;
        /*this.ELEMENT_DATA.push(
          {
            No:this.noElements,
            name: returnedData.data.selectedSkill,
            rating: returnedData.data.rateValue
            });*/
        console.log("element"+JSON.stringify(this.ELEMENT_DATA[0]));
        var arr=[];
        for(let i=0;i<this.ELEMENT_DATA.length;i++)
        {
              arr.push(this.ELEMENT_DATA[i]);
            }

          arr.push({
                No:this.noElements,
                name: returnedData.data.selectedSkill,
                rating: returnedData.data.rateValue
                });

        this.ELEMENT_DATA=arr;
        //console.log("element2"+JSON.stringify(this.ELEMENT_DATA[1]));
        this.dataSource =this.ELEMENT_DATA;

      //return the skill and the value to profile then send request to backend
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
  }

  noElements=1;
  ELEMENT_DATA= [
    {No: 1, name: 'Hydrogen', rating: 1.0079}
  ];
  displayedColumns: string[] = ['No', 'name', 'rating','actions'];
  dataSource = this.ELEMENT_DATA;

 
}
