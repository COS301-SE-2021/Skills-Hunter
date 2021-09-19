import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../classes/Login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../services/login-register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { roleSet } from '../events/roleSet';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";  
  _match: boolean = true;
  err: boolean = false;
  errorMessage:string = "";
  rememberMe: boolean = false;

  constructor(private loginService: LoginRegisterService,private _router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit():void {
    if(this.password == "" || this.email == ""){
      this.err = true;
      if(this.password == "")
        this.errorMessage = "password field empty.";

      if(this.email == "")
        this.errorMessage = "email field empty.";
    }else{
      let profile:Login = {
        Email : this.email,
        Password : this.password
      } 

      this.loginService.login(profile).subscribe(data=>{
        if(this.rememberMe === false){
          sessionStorage.setItem('role', data.body.role);
          sessionStorage.setItem('token', data.body.token);
          sessionStorage.setItem('name', data.body.name);
          sessionStorage.setItem('surname', data.body.surname);
          sessionStorage.setItem('email', data.body.email);
          sessionStorage.setItem('phone', data.body.phone);
          sessionStorage.setItem('openForWork', data.body.openForWork);
          sessionStorage.setItem('userID', data.body.userId);
        }else{
          localStorage.setItem('role', data.body.role);
          localStorage.setItem('token', data.body.token);
          localStorage.setItem('name', data.body.name);
          localStorage.setItem('surname', data.body.surname);
          localStorage.setItem('email', data.body.email);
          localStorage.setItem('phone', data.body.phone);
          localStorage.setItem('openForWork', data.body.openForWork);
          localStorage.setItem('userID',data.body.userId);
        }

        localStorage.setItem('rememberMe', this.rememberMe.toString());

        document.dispatchEvent(roleSet);

        if(data.body.role == 0)
          this._router.navigate([`home`]);
        else if(data.body.role == 1)
          this._router.navigate([`home`]);
        else if(data.body.role == 2)
          this._router.navigate([`home`]);
        else if(data.body.role == 3)
          this._router.navigate([`dashboard`]);


      },error=>{

        if(error.status == 400){
          this.err = true;
          this.errorMessage = "Account does not exist or incorrect password.";
        }else{

          this._snackBar.open("An error has occurred on the server","",{
            duration: 5000,
          });
        }
      });
    }
  }

}
