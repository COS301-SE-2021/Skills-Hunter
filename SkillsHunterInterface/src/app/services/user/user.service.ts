import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginRequest } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }

  login(formData: loginRequest): Observable<any> {
    return this.httpclient.post(
      'http://localhost:5000/api/User/Authenticate',
      formData,{observe:'response'}
    );
  }

  //send request to back end to register new user
  /*register(formData: Register): Observable<any> {
    
    return this.httpclient.post(
      'http://localhost:5000/api/User/register',
      formData,{observe:'response'}
    );
  }*/
}
