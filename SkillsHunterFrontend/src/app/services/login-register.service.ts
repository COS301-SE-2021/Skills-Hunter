import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Login } from '../classes/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  constructor(private httpclient: HttpClient) {}

  //send request to back end to validate user login details
  login(formData: Login): Observable<any> {
    return this.httpclient.post(
      'http://localhost:5000/api/Project/createProject',
      formData
    );
  }

  //send request to back end to register new user
  register(formData: Login): Observable<any> {
    return this.httpclient.post(
      'http://localhost:5000/api/Project/createProject',
      formData
    );
  }
}
