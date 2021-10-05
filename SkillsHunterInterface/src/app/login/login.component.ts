import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginRequest } from "../classes/user";
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData:loginRequest;
  email = new FormControl('', [Validators.required, Validators.email]);
  
  constructor(
    private loginService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    
    document.getElementById('tool').style.display = "none";
    document.getElementById('side').style.display = "none";
  }

  hide = true; // for hiding password in UI

  _match = true;
  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    
    this.formData = new loginRequest();
    this.formData.Email = this.LoginForm.get('email').value.toString();
    this.formData.Password = this.LoginForm.get('password').value;

    this.loginService.login(this.formData)
    .subscribe(
      data=>{
        
        if(data.status==200)
        {
          this._match=true;
          localStorage.setItem('role', data.body.role);
          localStorage.setItem('token',data.body.token);
          localStorage.setItem('name',data.body.name);
          localStorage.setItem('surname',data.body.surname);
          localStorage.setItem('email',data.body.email);
          localStorage.setItem('phone',data.body.phone);
          localStorage.setItem('openForWork',data.body.openForWork);

          if(data.body.role==3){
            this._router.navigate([`home`]);
          }
          else if(data.body.role == 1){
            this._router.navigate([`projectManagement`]);
          }
          else{
            this._router.navigate([`home`]);
          }
         
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

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
