import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { project } from 'src/app/classes/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/api/Project/';
  private header ;

  constructor(private http: HttpClient) {
    //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjczMmVkOGNhLTA5MWEtNDE0ZS02N2Q2LTA4ZDk4MDIxMzI0ZiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTYzMzQ2NzQ2MiwiZXhwIjoxNjMzNTUzODYyLCJpYXQiOjE2MzM0Njc0NjJ9.smButnOGRB56Jyn2hh4c8uBij5H97SeO5DD94DCu4JM");
    this.header = new HttpHeaders().
    set('content-type','application/json').
    set('authorization','Bearer ' + localStorage.getItem('token'));
  }

  getProjectByOwnerId(): Observable<project[]>{
    return this.http.get<any[]>(this.apiUrl + "getProjectsByOwnerId" , {headers : this.header});
  }
}
