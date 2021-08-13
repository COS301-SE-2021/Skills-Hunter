import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(private httpclient: HttpClient) { }

  //send request to back end to register new user
  postImg(img: File){
    
    const formData: FormData = new FormData();
    formData.append('Image', img, img.name);
    console.log("form: "+formData);
    return this.httpclient.post(
      'http://localhost:5000/api/User/register',
      formData,{observe:'response'}
    );
  }
}
