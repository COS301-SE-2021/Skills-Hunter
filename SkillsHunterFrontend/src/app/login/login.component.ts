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

    /*this.loginService.login(formData)
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
    );*/

    if (true) {


      /*localStorage.setItem('role', 'ProjectOwner');
      localStorage.setItem('userID', '5670EB33-F5ED-48A1-824F-CDD334279B63');*/

     localStorage.setItem('role', 'Admin');
      localStorage.setItem('userID', '61811B1B-3B31-420F-82FE-CE91DBAFC289');

     /* localStorage.setItem('role', 'Candidate');
      localStorage.setItem('userID', '5670EB33-F5ED-48A1-824F-CDD334279B63');*/

      this._match = true;
      this._router.navigate([`home`]);
    } else {
      this._match = false;
    }
  }
}
