import { Injectable } from '@angular/core';
import { getSkillsResponse, removeSkillResponse, removeSkillRequest, getCategoriesResponse, removeCategoryResponse, removeCategoryRequest, addCategoryResponse, addCategoryRequest } from '../api-message-class/message';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/';
  private header = null;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().
    set('content-type','application/json').
    set('authorization','Bearer ' + localStorage.getItem('token'));

  } 
  
  getSkills(): Observable<getSkillsResponse> {
    return this.http.get<getSkillsResponse>(this.apiUrl + "Admin/getSkills",{headers : this.header});
  }

  removeSkill(id: string): Observable<removeSkillResponse> {
    let request: removeSkillRequest = {
      skillId : id
    };

    return this.http.post<removeSkillResponse>(this.apiUrl + "Admin/removeSkill",request,{headers : this.header});
  }

  getCategories(): Observable<getCategoriesResponse>{
    return this.http.get<getCategoriesResponse>(this.apiUrl + "Admin/getCategories",{headers : this.header});
  }
 
  removeCategory(id: string): Observable<removeCategoryResponse>{
    let request: removeCategoryRequest = {
      Id: id
    };

    return this.http.post<removeCategoryResponse>(this.apiUrl + "Admin/removeCategory",request,{headers : this.header});
  }

  addCategory(name:string,description: string):Observable<addCategoryResponse>{
    let request: addCategoryRequest = {
      name : name,
      description: description
    }

    return this.http.post<addCategoryResponse>(this.apiUrl + "Admin/addCategory",request,{headers : this.header});
  }
}