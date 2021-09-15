import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef,MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-work-exp',
  templateUrl: './work-exp.component.html',
  styleUrls: ['./work-exp.component.scss']
})
export class WorkExpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkExpComponent>,private dialog: MatDialog) { }

  ngOnInit(): void {
  }

dropList: string[] = ['Day(s)', 'Month(s)','Year(s)'];
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
    duration: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')]),
    time:new FormControl('',[Validators.required]),
  
  });

  onSubmit(){
    console.log("clicked work");
    if(!this.workDetailsForm.controls['organisation'].invalid && !this.workDetailsForm.controls['role'].invalid && 
    !this.workDetailsForm.controls['description'].invalid && !this.workDetailsForm.controls['duration'].invalid && !this.workDetailsForm.controls['time'].invalid){
      console.log("valid");
      this.workDetailsForm.controls['organisation'].value

      this.dialogRef.close({data:{
        organisation:this.workDetailsForm.controls['organisation'].value,
        role:this.workDetailsForm.controls['role'].value,
        description:this.workDetailsForm.controls['description'].value,
        duration:this.workDetailsForm.controls['duration'].value,
        time:this.workDetailsForm.controls['time'].value
      }});
    }
  }

  cancel(){
    this.dialogRef.close({data:-1});//-1 to indicate cancellation
  }
}
