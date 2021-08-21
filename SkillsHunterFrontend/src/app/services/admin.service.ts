import { Injectable } from '@angular/core';
import { getUserSkillResponse, getSkillCollectionResponse,getProjectsResponse, userSkillModel, getUserResponse, getSkillsResponse, removeSkillResponse, removeSkillRequest, getCategoriesResponse, removeCategoryResponse, removeCategoryRequest, addCategoryResponse, addCategoryRequest, updateSkillRequest, skillModel } from '../api-message-class/message';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

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

  updateSkill(skill:skillModel): Observable<any>{
    let request:updateSkillRequest = {
      id: skill.skillId,
      name: skill.name,
      categoryId: "",
      status: skill.status
    }
    return this.http.post(this.apiUrl + "Admin/updateSkill",request,{headers : this.header});
  }

  getSkillCollections(): Observable<getSkillCollectionResponse[]>{
    return this.http.get<getSkillCollectionResponse[]>(this.apiUrl + "Admin/getAllSkillCollections" , {headers : this.header});
  }

  getProjects(): Observable<getProjectsResponse[]> {
    return this.http.get<getProjectsResponse[]>(this.apiUrl + "Project/getProjects",{headers : this.header});
  }

  getUserSkills(id:string): Observable<getUserSkillResponse[]> {
    return this.http.get<getUserSkillResponse[]>(this.apiUrl + "User/GetUserSkillsByUserId?userId=" + id,{headers : this.header});
  }
  
  getUsers(): Observable<getUserResponse[]> {
    return this.http.get<getUserResponse[]>(this.apiUrl + "User/getAllUsers",{headers : this.header});
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
