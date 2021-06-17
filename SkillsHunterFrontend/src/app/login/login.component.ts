import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.buttonLogin = "";

    document.getElementById("tool").style.display = "none";
  }

  hide = true;// for hiding password in UI
  _username:string;
  _password:string;
  _match:boolean;
  buttonLogin:string;

  LoginForm = new FormGroup({  
    email: new FormControl('', [Validators.required,Validators.email]) ,  
    password: new FormControl('', [Validators.required]),
  });

  

  onSubmit() 
  {
    this.buttonLogin="clicked";

  }
}
