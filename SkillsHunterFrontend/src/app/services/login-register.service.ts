import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { login } from '../classes/login';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private httpclient: HttpClient) { }

  login(formData:login):Observable<any>
  {
    return this.httpclient.post("http://localhost:5000/api/Project/createProject",formData);
  }
}
