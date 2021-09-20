import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../classes/Login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

      const request = this.loginService.login(profile).subscribe(data=>{
        localStorage.setItem('role', data.body.role);
        localStorage.setItem('token', data.body.token);
        localStorage.setItem('name', data.body.name);
        localStorage.setItem('surname', data.body.surname);
        localStorage.setItem('email', data.body.email);
        localStorage.setItem('phone', data.body.phone);
        localStorage.setItem('openForWork', data.body.openForWork);
        
        if(data.body.role == 0)
          this._router.navigate([`home`]);
        else if(data.body.role == 1)
          this._router.navigate([`home`]);
        else if(data.body.role == 2)
          this._router.navigate([`home`]);
        else if(data.body.role == 3)
          this._router.navigate([`user-control`]);  
      },error=>{

        if(error.status == 400){
          this.err = true;
          this.errorMessage = error.message;
        }else{

          this._snackBar.open("An error has occurred on the server","",{
            duration: 5000,
          });
        }
      });

      setTimeout(() => {
          request.unsubscribe();
          this._snackBar.open("request timedout","",{
            duration: 5000,
          });
      }, 1000);
    }

    // var formData = new Login();

    // formData.Email = this.LoginForm.get('email').value;
    // formData.Password = this.LoginForm.get('password').value;

    // this.loginService.login(formData).subscribe(
    //   (data) => {
    //     if (data.status == 200) {
    //       this._match = true;
    //       localStorage.setItem('role', data.body.role);
    //       localStorage.setItem('token', data.body.token);
    //       localStorage.setItem('name', data.body.name);
    //       localStorage.setItem('surname', data.body.surname);
    //       localStorage.setItem('email', data.body.email);
    //       localStorage.setItem('phone', data.body.phone);
    //       localStorage.setItem('openForWork', data.body.openForWork);

    //       if (data.body.role == 3) {
    //         this._router.navigate([`user-control`]);
    //       } else {
    //         this._router.navigate([`home`]);
    //       }
    //     } else {
    //       this._match = false;
    //     }
    //   },
    //   (err) => {
    //     if (err.status >= 400 && err.status < 500) {
    //       this._match = false;
    //     } else {
    //       console.log('HTTP Error1', err); //server error
    //     }
    //   }
    // );
  }

}
