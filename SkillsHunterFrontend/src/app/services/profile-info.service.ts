import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(private httpclient: HttpClient) { }

  //send request to back end to register new user
  postImg(img: File){
    var auth;
    if(localStorage.getItem('rememberMe')=="true"){
      auth=localStorage.getItem('token');
    }else{
      auth=sessionStorage.getItem('token');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer '+auth
      })
    };
    
    const formData: FormData = new FormData();
    formData.append('Image', img, img.name);
    console.log("form: "+formData);
    return this.httpclient.post(
      'http://localhost:5000/api/User/uploadProfileImage',
      formData,httpOptions
    );
  }

  userDetailUpdate(formData){
    var auth;
    if(localStorage.getItem('rememberMe')=="true"){
      auth=localStorage.getItem('token');
    }else{
      auth=sessionStorage.getItem('token');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer '+auth
      })
    };
    return this.httpclient.post<any>(
      'http://localhost:5000/api/User/update',formData, httpOptions);
  }
 
}
