import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../services/login-register.service';
import { Router } from '@angular/router';
import { Register } from '../classes/Register';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  phone: string = "";
  role: number = 0;
  password: string = "";
  err: boolean = false;
  errorMessage: string = "";

  constructor(private registerService: LoginRegisterService,private _router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit():void{
    if(this.firstname == ""){
      this.err = true;
      this.errorMessage = "firstname field empty.";
    }else if(this.lastname == ""){
      this.err = true;
      this.errorMessage = "lastname field empty.";
    }else if(this.email == ""){
      this.err = true;
      this.errorMessage = "email field empty.";
    }else if(this.phone == ""){
      this.err = true;
      this.errorMessage = "phone number field empty.";
    }else if(this.password == ""){
      this.err = true;
      this.errorMessage = "password field empty.";
    }else{
      let account: Register = {
        name : this.firstname,
        surname : this.lastname,
        email : this.email,
        password : this.password,
        phone : this.phone,
        role : this.role
      };

      this.registerService.register(account).subscribe(data=>{

        if(data.status==200){
          this._router.navigate([`login`]);
        }else{
          alert("unsuccessful registration");
        }
      },
      error =>{
       
        if(error.status == 400){
          this.err = true;
          this.errorMessage = error.message;
        }else{

          this._snackBar.open("An error has occurred on the server","",{
            duration: 5000,
          });
        }
      });

    }

  }

}
