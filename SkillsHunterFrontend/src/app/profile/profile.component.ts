import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProfileInfoService } from '../services/profile-info.service';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { AddSkillComponent } from './add-skill/add-skill.component';
import {WorkExpComponent} from './work-exp/work-exp.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { ProjectCRUDService } from './../services/project-crud.service';
import { JsonpClientBackend } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { SliderComponent } from './slider/slider.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
@ViewChild(MatPaginator, { static: false }) paginator:MatPaginator;
  imageUrl: string = "/assets/images/profile.png";
  fileToUpload: File = null;

  constructor(private service: ProjectCRUDService,private profileService: ProfileInfoService,private dialog: MatDialog,private _formBuilder: FormBuilder) { }
  isLinear = true;
 
  secondFormGroup: FormGroup;
//variables below used to display table of skills
   noElements=0;
  ELEMENT_DATA= [
  ];
  displayedColumns: string[] = ['No', 'name', 'rating','actions'];
  dataSource = this.ELEMENT_DATA;

  returned;
  array2 = [];

  //variables below used to display table of work experience
  noElements2=0;
  work_DATA= [
  ];
  displayedColumns2: string[] = ['No', 'organisation', 'role','description', 'from','to','actions'];
  dataSourceWork = this.work_DATA;

  ngOnInit(): void {
 
   
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  ///////////
    document.getElementById('tool').style.display = "block";
    document.getElementById('side').style.display = "block";
    document.getElementById('adminlist').style.display = "none";
     document.getElementById('houseAdmin').style.display = "none";
     
    this.firstFormGroup.controls['name'].setValue(localStorage.getItem('name'));
    this.firstFormGroup.controls['surname'].setValue(localStorage.getItem('surname'));
    this.firstFormGroup.controls['email'].setValue(localStorage.getItem('email'));
    this.firstFormGroup.controls['phone'].setValue(localStorage.getItem('phone'));
    this.firstFormGroup.controls['open'].setValue(localStorage.getItem('openForWork'));

    if(localStorage.getItem('role')=='1'){
      document.getElementById('toggleB').style.display = "none";
      document.getElementById('tablecont').style.display = "none";
      document.getElementById('addskillBtn').style.display = "none";
      
    }
    this.service.getIndividualsSkills().subscribe((data) => {
      if (data) {
        //status==200)
        console.log(data);
      } else {
        //alert that couldnt fetch data
      }
    });

    this.service.getSkills().subscribe((data) => {
      if (data) {
        //status==200)
        console.log(data);
        this.returned = data;
        this.array2 = this.returned.skills;
      } else {
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
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
    ]),
    password: new FormControl('', [Validators.required]),
    open: new FormControl(''),
  });

  firstFormGroup=new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')]),
    open: new FormControl('')
  });

  linksFormGroup=new FormGroup({
    link: new FormControl(''),
    github: new FormControl('')
  });
  viewImg(){
 
    const configDialog = new MatDialogConfig();
    const dialogRef = this.dialog.open(ProfileImgComponent, {
      width: '40%',
      height: '80%',
      data: { img: this.imageUrl },
    });
    // console.log("back");
    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        this.imageUrl = data.img;
        //return the skill and the value to profile then send request to backend
      } else {
        console.log('returned empty:');
      } //dialog closed
    });
  }

  addskill() {
    console.log('val: ' + document.getElementById('toggleB'));
    const configDialog = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '40%',
      height: '80%',
    });
    // console.log("back");
    dialogRef.afterClosed().subscribe((returnedData) => {
      if (returnedData != undefined) {
        console.log('profile: ' + returnedData.data.selectedSkill);
        console.log('rate: ' + returnedData.data.rateValue);
        //first check if skill is already in the list
        var key=false;
        for(let j=0;j<this.ELEMENT_DATA.length;j++){

          if(this.ELEMENT_DATA[j].name==returnedData.data.selectedSkill)
          {
            key=true;
          }
        }
        if (!key) {
          this.noElements++;
          console.log('element' + JSON.stringify(this.ELEMENT_DATA[0]));
          var arr = [];
          for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
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
      else{
        alert("Skill already exists");
      }
      //return the skill and the value to profile then send request to backend
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
  }

  //parameter n is a number indicating position of details on table
  deleteSkill(n){

    if(confirm(`Are you sure to delete ${this.ELEMENT_DATA[n-1].name} from the list?`)) {
     
      var arr=[];
      var f=false;
      for(let j=0;j<this.ELEMENT_DATA.length;j++)
      {
          if(j==(n-1)){
            f=true;
          }

          if(j!=(n-1)){

            if(f){// adjust numbering after element is deleted
              this.ELEMENT_DATA[j].No=this.ELEMENT_DATA[j].No-1;
            }
            arr.push(this.ELEMENT_DATA[j]);
          }  
      }

      this.ELEMENT_DATA=arr;
      this.dataSource =this.ELEMENT_DATA;
      this.noElements--;
    }
   }

   //edit skill rating
   //parameter n is a number indicating position of details on table
   editSkill(n){
    console.log("inx"+n);
    var key=false;
    var i=0;
    var dataToEdit;
    //find data that needs to be edited
    while(!key){

     if(this.ELEMENT_DATA[i].No==n){
       dataToEdit=this.ELEMENT_DATA[i];
       key=true;
     }
     i++;
    }
  
    const dialogRef = this.dialog.open(SliderComponent,
      {   width: '25%',
         height:'27%',
        data:this.ELEMENT_DATA[i-1].rating
      });
console.log("v: "+this.ELEMENT_DATA[i-1].rating);

     dialogRef.afterClosed().subscribe(returnedData => {
  
       if(returnedData !=undefined && returnedData.data !=-1)
       {
         var arr=[];
         for(let j=0;j<this.ELEMENT_DATA.length;j++)
         {
             if(j==(i-1)){
              this.ELEMENT_DATA[j].rating=returnedData.data;
               
             }
               arr.push(this.ELEMENT_DATA[j]);
            }
 
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

    var o = false;

    if (this.personalDetailsForm.get('open').value == 'true') {
      o = true;
    }

    var obj= {
       name:this.personalDetailsForm.get('name').value,
       surname: this.personalDetailsForm.get('surname').value,
       email: this.personalDetailsForm.get('email').value,
       phoneNumber: this.personalDetailsForm.get('phone').value,
       startDate: "2021-08-17T21:16:36.745Z",
       openForWork:o,
       existingSkills:arrRequest

     };
     console.log(JSON.stringify(obj));

     
     this.profileService.userDetailUpdate(obj)
     .subscribe(
       data=>{
        
         console.log('Response post', data);
         localStorage.setItem('name',obj.name);
         localStorage.setItem('surname',obj.surname);
         localStorage.setItem('email',obj.email);
         localStorage.setItem('phone',obj.phoneNumber);
         if(o){
          localStorage.setItem('openForWork','true');
         }
         else{
          localStorage.setItem('openForWork','false');
         }
       }
     );
    
   }
 
   addExperience(){
     
    const configDialog = new MatDialogConfig();
    const dialogRef = this.dialog.open(WorkExpComponent,
      {   width: '40%',
         height:'80%',
         data:""
      });
   // console.log("back");
    dialogRef.afterClosed().subscribe(returnedData => {
   
      if(returnedData !=undefined && returnedData.data !=-1)
      {
        console.log("in back");
        // console.log("prof: "+JSON.stringify(returnedD.data));
        //console.log("prof: "+JSON.stringify(returnedD.data.organisation));
       console.log("prof: "+returnedData.data.organisation);
       
        //first check if organisation is already in the list
        var key=false;
        for(let j=0;j<this.work_DATA.length;j++){

          if(this.work_DATA[j].organisation==returnedData.data.organisation)
          {
            key=true;
          }
        }
        if(!key){

        
        this.noElements2++;
        var temp;
        var arr=[];
        for(let i=0;i<this.work_DATA.length;i++)
        {
              arr.push(this.work_DATA[i]);
            }

            if(returnedData.data.end==null){
              temp="present";
            }
            else{
              temp=String(returnedData.data.end).substring(4, 15);
            }
 
          arr.push({
            No:this.noElements2,
            organisation:returnedData.data.organisation,
            role: returnedData.data.role,
            description: returnedData.data.description,
            start: String(returnedData.data.start).substring(4, 15),
            end: temp,
            realStart:returnedData.data.start,
            realEnd:returnedData.data.end
                });

        this.work_DATA=arr;
        //console.log("element2"+JSON.stringify(this.ELEMENT_DATA[1]));
        this.dataSourceWork =this.work_DATA;

      }else{
        alert("organisation already exists");
      }
      //return the skill and the value to profile then send request to backend
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
   }
 
   //edit work information
   //parameter n is a number indicating position of details on table
   edit(n){
     console.log(n);
     var key=false;
     var i=0;
     var dataToEdit;
     //find data that needs to be edited
     while(!key){

      if(this.work_DATA[i].No==n){
        dataToEdit=this.work_DATA[i];
        key=true;
      }
      i++;
     }
   
     const dialogRef = this.dialog.open(WorkExpComponent,
      {   width: '40%',
         height:'80%',
        data:dataToEdit
      });

      dialogRef.afterClosed().subscribe(returnedData => {
   
        if(returnedData !=undefined && returnedData.data !=-1)
        {
          
         
          //first check if organisation is already in the list
          var key=false;
          for(let j=0;j<this.work_DATA.length;j++){
  
            if(this.work_DATA[j].organisation==returnedData.data.organisation)
            {
              key=true;
            }
          }
          var temp;
          var arr=[];
          for(let j=0;j<this.work_DATA.length;j++)
          {
              if(j==(i-1)){
                if(returnedData.data.end==null){
                  temp="present";
                }
                else{
                  temp=String(returnedData.data.end).substring(4, 15);
                }
                arr.push({
                  No:n,
                  organisation:returnedData.data.organisation,
                  role: returnedData.data.role,
                  description: returnedData.data.description,
                  start: String(returnedData.data.start).substring(4, 15),
                  end: temp,
                  realStart:returnedData.data.start,
                  realEnd:returnedData.data.end
                      });
              }
              else{
                arr.push(this.work_DATA[j]);
              }
                
             }
  
          this.work_DATA=arr;

          //console.log("element2"+JSON.stringify(this.ELEMENT_DATA[1]));
          this.dataSourceWork =this.work_DATA;
     
        //return the skill and the value to profile then send request to backend
        }
        else{ 
          console.log("returned empty:");
        }//dialog closed
      });

   }
 //parameter n is a number indicating position of details on table
   delete(n){

    if(confirm(`Are you sure to delete ${this.work_DATA[n-1].organisation} from the list?`)) {
     
      var arr=[];
      var f=false;
      for(let j=0;j<this.work_DATA.length;j++)
      {
          if(j==(n-1)){
            f=true;
          }

          if(j!=(n-1)){

            if(f){// adjust numbering after element is deleted
              this.work_DATA[j].No=this.work_DATA[j].No-1;
            }
            arr.push(this.work_DATA[j]);
          }  
      }

      this.work_DATA=arr;
      this.dataSourceWork =this.work_DATA;
      this.noElements2--;
    }
   }
}
