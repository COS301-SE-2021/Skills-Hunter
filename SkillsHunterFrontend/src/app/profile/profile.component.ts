import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileInfoService } from '../services/profile-info.service';
import { MatDialogRef,MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { ProjectCRUDService } from './../services/project-crud.service';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageUrl: string = "/assets/images/profile.png";
  fileToUpload: File = null;

  constructor(private service: ProjectCRUDService,private profileService: ProfileInfoService,private dialog: MatDialog) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

   noElements=0;
  ELEMENT_DATA= [
  ];
  displayedColumns: string[] = ['No', 'name', 'rating','actions'];
  dataSource = this.ELEMENT_DATA;

  returned;
  array2=[];

  ngOnInit(): void {

    document.getElementById('tool').style.display = "block";
    document.getElementById('side').style.display = "block";
    document.getElementById('adminlist').style.display = "none";
     document.getElementById('houseAdmin').style.display = "none";
     
    this.personalDetailsForm.controls['name'].setValue(localStorage.getItem('name'));
    this.personalDetailsForm.controls['surname'].setValue(localStorage.getItem('surname'));
    this.personalDetailsForm.controls['email'].setValue(localStorage.getItem('email'));
    this.personalDetailsForm.controls['phone'].setValue(localStorage.getItem('phone'));
    this.personalDetailsForm.controls['open'].setValue(localStorage.getItem('openForWork'));

    if(localStorage.getItem('role')=='1'){
      document.getElementById('toggleB').style.display = "none";
      document.getElementById('tablecont').style.display = "none";
      document.getElementById('addskillBtn').style.display = "none";
      
    }
    this.service.getIndividualsSkills()
    .subscribe(
      data=>{
        
        if(data)//status==200)
        {
          console.log(data);
         
        }
        else{
          //alert that couldnt fetch data
        }
      });

      this.service.getskills()
      .subscribe(
        data=>{
          
          if(data)//status==200)
          {
            console.log(data);
            this.returned=data;
            this.array2=this.returned.skills;

          }
          else{
            //alert that couldnt fetch data
          }
        });
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
        //first check if skill is already in the list
        var key=false;
        for(let j=0;j<this.ELEMENT_DATA.length;j++){

          if(this.ELEMENT_DATA[j].name=returnedData.data.selectedSkill)
          {
            key=true;
          }
        }
        if(!key){

        
        this.noElements++;
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
      }
      //return the skill and the value to profile then send request to backend
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
   
  }

  onSubmit(){
    console.log("in on submit");
    var key=false;
    var arrRequest=[];
    for(let i=0;i<this.array2.length;i++){

      key=false;

      for(let j=0;j<this.ELEMENT_DATA.length && !key;j++){

          if(this.array2[i].name==this.ELEMENT_DATA[j].name){
            key=true
            console.log("in if ");
            arrRequest.push({
              skillId:this.array2[i].skillId,
              weight:this.ELEMENT_DATA[j].rating
            });
          }
      }

    }
    var obj= {
       name:this.personalDetailsForm.get('name').value,
       surname: this.personalDetailsForm.get('surname').value,
       email: this.personalDetailsForm.get('email').value,
       phoneNumber: this.personalDetailsForm.get('phone').value,
       startDate: "2021-08-17T21:16:36.745Z",
       openForWork:this.personalDetailsForm.get('open').value,
       existingSkills:arrRequest

     };
     console.log(JSON.stringify(obj));

     
     this.profileService.userDetailUpdate(obj)
     .subscribe(
       data=>{
        
         console.log('Response post', data);
       }
     );
     localStorage.setItem('name',obj.name);
     localStorage.setItem('surname',obj.surname);
     localStorage.setItem('email',obj.email);
     localStorage.setItem('phone',obj.phoneNumber);
     localStorage.setItem('openForWork',obj.openForWork);
   }
 
}
