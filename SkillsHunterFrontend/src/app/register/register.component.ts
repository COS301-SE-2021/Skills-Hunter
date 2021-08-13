import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../services/login-register.service';
import { Router } from '@angular/router';
import { Register } from '../classes/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private registerService: LoginRegisterService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById('tool').style.display = 'none';
  }

  hide = true; // for hiding password in UI
  _match = true;
  role: string[] = ['create a project and recruit candidates','participate in Projects'];
  registationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')]),
    password: new FormControl('', [Validators.required]),
    indicateRole: new FormControl('', [Validators.required])
  });

  onSubmit() {
    var formData = new Register();

    formData.name = this.registationForm.get('name').value;
    formData.surname = this.registationForm.get('surname').value;
    formData.email = this.registationForm.get('email').value;
    formData.password = this.registationForm.get('password').value;
    formData.phone=`${this.registationForm.get('phone').value}`;
    if(this.registationForm.get('password').value=='create a project and recruit candidates')
    {
      formData.role = 1;
    }
    else
    {
      formData.role = 0;
    }
    console.log("phone: "+formData.phone);
 
    this.registerService.register(formData)
    .subscribe(
      data=>{

        if(data.status==200)
        {
          this._match=true;
          alert("registration successful");
          this._router.navigate([`login`]);
        }
        else
        {
          console.log(data.body.message);
          this._match=false;
        }
      },
      err =>{
       
        if(err.status>=400 && err.status<500){
          console.log("err:"+err.Response);
          console.log(err.message);
          this._match=false;
        }
       else
       {
        alert("registration failed. Unable to connect to server");
         console.log('HTTP Error1', err);//server error
       }
      }
    );
   
  }
}
