import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-work-exp',
  templateUrl: './work-exp.component.html',
  styleUrls: ['./work-exp.component.scss']
})
export class WorkExpComponent implements OnInit {

  constructor() { }

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
    time:new FormControl(''),
  
  });
}
