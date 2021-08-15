import { Injectable } from '@angular/core';
import { skillModel, getSkills} from '../api-response-class/response';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }
  //http://localhost:5000/api/Admin/getSkills
  getSkills(): Observable<getSkills> {
    return this.http.get<getSkills>(this.apiUrl + "Admin/getSkills",{responseType : 'json'});
  }
}
