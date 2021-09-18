import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef,MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-work-exp',
  templateUrl: './work-exp.component.html',
  styleUrls: ['./work-exp.component.scss']
})
export class WorkExpComponent implements OnInit {

  constructor(private dateAdapter: DateAdapter<Date>,@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<WorkExpComponent>,private dialog: MatDialog) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  empty=true;//show if this is new data being created or existing being edited. true means new data
  
  ngOnInit(): void {

    var d=this.data;

    if(d!=""){
      console.log("not empty");
      console.log("data: "+d.organisation);
      this.workDetailsForm.controls['organisation'].setValue(d.organisation);
      this.workDetailsForm.controls['role'].setValue(d.role);
      this.workDetailsForm.controls['description'].setValue(d.description);
      this.workDetailsForm.controls['start'].setValue(d.realStart);
      this.workDetailsForm.controls['end'].setValue(d.realEnd);
    }

  }
  
//dropList: string[] = ['Day(s)', 'Month(s)','Year(s)'];
  workDetailsForm = new FormGroup({
    organisation: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    role: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'), 
    ]),
    //duration: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')]),
    //time:new FormControl('',[Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('' )
  });

  onSubmit(){
    console.log("clicked work");
    if(!this.workDetailsForm.controls['organisation'].invalid && !this.workDetailsForm.controls['role'].invalid && 
    !this.workDetailsForm.controls['description'].invalid && !this.workDetailsForm.controls['start'].invalid ){
      console.log("valid");
      this.workDetailsForm.controls['organisation'].value

      this.dialogRef.close({data:{
        organisation:this.workDetailsForm.controls['organisation'].value,
        role:this.workDetailsForm.controls['role'].value,
        description:this.workDetailsForm.controls['description'].value,
        start:this.workDetailsForm.controls['start'].value,
        end:this.workDetailsForm.controls['end'].value
      }});
    }
  }

  cancel(){
    this.dialogRef.close({data:-1});//-1 to indicate cancellation
  }
}
