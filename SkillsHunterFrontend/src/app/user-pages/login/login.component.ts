import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../classes/Login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true; // for hiding password in UI
  
  _match = true;

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private loginService: LoginRegisterService,private _router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    var formData = new Login();

    formData.Email = this.LoginForm.get('email').value;
    formData.Password = this.LoginForm.get('password').value;

    this.loginService.login(formData).subscribe(
      (data) => {
        if (data.status == 200) {
          this._match = true;
          localStorage.setItem('role', data.body.role);
          localStorage.setItem('token', data.body.token);
          localStorage.setItem('name', data.body.name);
          localStorage.setItem('surname', data.body.surname);
          localStorage.setItem('email', data.body.email);
          localStorage.setItem('phone', data.body.phone);
          localStorage.setItem('openForWork', data.body.openForWork);

          if (data.body.role == 3) {
            this._router.navigate([`user-control`]);
          } else {
            this._router.navigate([`home`]);
          }
        } else {
          this._match = false;
        }
      },
      (err) => {
        if (err.status >= 400 && err.status < 500) {
          this._match = false;
        } else {
          console.log('HTTP Error1', err); //server error
        }
      }
    );
  }

}
