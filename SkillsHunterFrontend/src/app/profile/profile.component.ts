import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProfileInfoService } from '../services/profile-info.service';
import { MatDialogRef,MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSkillComponent } from './add-skill/add-skill.component';
import {WorkExpComponent} from './work-exp/work-exp.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { ProjectCRUDService } from './../services/project-crud.service';
import { JsonpClientBackend } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
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
  array2=[];

  //variables below used to display table of work experience
  noElements2=0;
  work_DATA= [
  ];
  displayedColumns2: string[] = ['No', 'organisation', 'role','description', 'duration','time','actions'];
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
    phone: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')])
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

          if(this.ELEMENT_DATA[j].name==returnedData.data.selectedSkill)
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

    var o=false;

    if(this.personalDetailsForm.get('open').value=="true"){
      o=true;
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
        
        var arr=[];
        for(let i=0;i<this.work_DATA.length;i++)
        {
              arr.push(this.work_DATA[i]);
            }

          arr.push({
            No:this.noElements2,
            organisation:returnedData.data.organisation,
            role: returnedData.data.role,
            description: returnedData.data.description,
            duration: returnedData.data.duration,
            time: returnedData.data.time
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
          
          var arr=[];
          for(let j=0;j<this.work_DATA.length;j++)
          {
              if(j==(i-1)){
                
                arr.push({
                  No:n,
                  organisation:returnedData.data.organisation,
                  role: returnedData.data.role,
                  description: returnedData.data.description,
                  duration: returnedData.data.duration,
                  time: returnedData.data.time
                      });
              }
              else{
                arr.push(this.work_DATA[j]);
              }
                
             }
  
             //send request to backend
            /*if(success) {
              this.work_DATA=arr;
            }else{
              alert("unable to ubdate an error has occured");
            }*/
  
          this.work_DATA=arr;//remove after if else

          //console.log("element2"+JSON.stringify(this.ELEMENT_DATA[1]));
          this.dataSourceWork =this.work_DATA;
     
        //return the skill and the value to profile then send request to backend
        }
        else{ 
          console.log("returned empty:");
        }//dialog closed
      });

   }
 
   delete(n){
     
   }
}
