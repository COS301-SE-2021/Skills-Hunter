import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../services/login-register.service';
import { Router } from '@angular/router';
import { Login } from '../classes/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginRegisterService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById('tool').style.display = 'none';
  }

  hide = true; // for hiding password in UI

  _match = true;

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    var formData = new Login();

    formData.Email = this.LoginForm.get('email').value;
    formData.Password = this.LoginForm.get('password').value;

    this.loginService.login(formData)
    .subscribe(
      data=>{
        
        if(data.status==200)
        {
          this._match=true;
          localStorage.setItem('role', data.body.role);
          localStorage.setItem('token','Bearer '+data.body.token);
          localStorage.setItem('name',data.body.name);
          localStorage.setItem('surname',data.body.surname);
          this._router.navigate([`home`]);
        }
        else
        {
          this._match=false;
        }
      },
      err =>{
       
        if(err.status>=400 && err.status<500){
          this._match=false;
        }
       else
       {
         console.log('HTTP Error1', err);//server error
       }
      }
    );
  }
}
