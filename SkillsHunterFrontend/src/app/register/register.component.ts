import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.buttonLogin = "";
    document.getElementById("tool").style.display = "none";
  }

  hide = true;// for hiding password in UI
  _match:boolean;
  buttonLogin:string;

  registationForm = new FormGroup({ 
    name: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
    surname: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]) ,  
    password: new FormControl('', [Validators.required]),
  });

  onSubmit()
  {

  }
}
