import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getSkillsResponse, removeCategoryRequest, removeSkillRequest } from 'src/app/classes/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/';
  private header ;

  constructor(private http: HttpClient) {
    //localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjczMmVkOGNhLTA5MWEtNDE0ZS02N2Q2LTA4ZDk4MDIxMzI0ZiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTYzMzQ2NzQ2MiwiZXhwIjoxNjMzNTUzODYyLCJpYXQiOjE2MzM0Njc0NjJ9.smButnOGRB56Jyn2hh4c8uBij5H97SeO5DD94DCu4JM");
    this.header = new HttpHeaders().
    set('content-type','application/json').
    set('authorization','Bearer ' + localStorage.getItem('token'));

  }
 
  getSkillCollections(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + "Admin/getAllSkillCollections" , {headers : this.header});
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "Project/getProjects",{headers : this.header});
  }

  getUserSkills(id:string): Observable<any> {
    return this.http.get(this.apiUrl + "User/GetUserSkillsByUserId?UserId=" + id,{headers : this.header,observe : "response"});
  }
  
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + "User/getAllUsers",{headers : this.header,observe:'response'});
  }
  
  getSkills(): Observable<getSkillsResponse> {
    return this.http.get<getSkillsResponse>(this.apiUrl + "Admin/getSkills",{headers : this.header});
  }

  removeSkill(id: string): Observable<any> {
    let request: removeSkillRequest = {
      skillId : id
    };

    return this.http.post<any>(this.apiUrl + "Admin/removeSkill",request,{headers : this.header});
  }

  getCategories(): Observable<any>{
    return this.http.get<any>(this.apiUrl + "Admin/getCategories",{headers : this.header});
  }
 
  removeCategory(id: string): Observable<any>{
    let request: removeCategoryRequest = {
      categoryId: id
    };

    return this.http.post<any>(this.apiUrl + "Admin/removeCategory",request,{headers : this.header});
  }

  addCategory(name:string,description: string):Observable<any>{
    let request: any = {
      name : name,
      description: description
    }

    return this.http.post<any>(this.apiUrl + "Admin/addCategory",request,{headers : this.header});
  }

}
