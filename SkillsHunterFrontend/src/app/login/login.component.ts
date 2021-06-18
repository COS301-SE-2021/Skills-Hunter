import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {login} from '../classes/login';
import {LoginRegisterService} from '../services/login-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginRegisterService,private _router: Router) { }

  ngOnInit(): void {
    this.buttonLogin = "";

    document.getElementById("tool").style.display = "none";
  }

  hide = true;// for hiding password in UI
  
  _match=true;
  buttonLogin:string;

  LoginForm = new FormGroup({  
    email: new FormControl('', [Validators.required,Validators.email]) ,  
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() 
  {
    //this.buttonLogin="clicked";
    var formData=new login();
    
    formData.Email= this.LoginForm.get('email').value;
    formData.Password = this.LoginForm.get('password').value;
    
   this.loginService.login(formData)
    .subscribe(
      data=>{
        console.log('Response post', data);
        if(data.Validated)
        {
          this._match=true;
          this._router.navigate([`home`]);
        }
        else
        {
          this._match=false;
        }
      }
    );

  }
}
