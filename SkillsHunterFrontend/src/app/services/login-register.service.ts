import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { login } from '../classes/login';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private httpclient: HttpClient) { }

  //send request to back end to validate user login details
  login(formData:login):Observable<any>
  {
    return this.httpclient.post("http://localhost:5000/api/Project/createProject",formData);
  }

  //send request to back end to register new user
  register(formData:login):Observable<any>
  {
    return this.httpclient.post("http://localhost:5000/api/Project/createProject",formData);
  }
}
