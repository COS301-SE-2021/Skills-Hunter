import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { register } from '../classes/register';
import { LoginRegisterService } from '../services/login-register.service';
import { Router } from '@angular/router';

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
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    var formData = new register();

    formData.Name = this.registationForm.get('name').value;
    formData.Surname = this.registationForm.get('surname').value;
    formData.Email = this.registationForm.get('email').value;
    formData.Password = this.registationForm.get('password').value;
    formData.Role = 'projectOwner';

    /*this.registerService.login(formData)
    .subscribe(
      data=>{

        if(data.Successful)
        {
          this._match=true;
          this._router.navigate([`login`]);
        }
        else
        {
          this._match=false;
        }
      }
    );*/
    if (true) {
      this._match = true;
      this._router.navigate([`login`]);
    } else {
      this._match = false;
    }
  }
}
