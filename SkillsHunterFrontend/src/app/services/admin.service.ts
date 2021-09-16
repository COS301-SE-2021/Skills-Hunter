import { Injectable } from '@angular/core';
import { getUserSkillResponse, getSkillCollectionResponse,getProjectsResponse, userSkillModel, getUserResponse, getSkillsResponse, removeSkillResponse, removeSkillRequest, getCategoriesResponse, removeCategoryResponse, removeCategoryRequest, addCategoryResponse, addCategoryRequest, updateSkillRequest, skillModel, getImageResponse, categoryModel, createSkillResponse, getCategoryByIdRequest, createSkillRequest } from '../api-message-class/message';
import { Observable, ObservableLike, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/';
  private header = null;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().
    set('content-type','application/json').
    set('authorization','Bearer ' + localStorage.getItem('token'));
  }

  getApiUrl(): string{
    return this.apiUrl;
  }

  getUser(id: string): Observable<getUserResponse>{
    return this.http.get<getUserResponse>(this.apiUrl + "api/User/getUserById?request=" + id,{headers : this.header})
  }

  creatSkill(nam: string, cat: getCategoryByIdRequest[]): Observable<createSkillResponse>{
    let request: createSkillRequest = {
      name : nam,
      categories : cat
    };

    console.log(request);

    return this.http.post<createSkillResponse>(this.apiUrl + "api/Admin/createSkill",request,{headers : this.header});
  }

  getImage(id: string): Observable<getImageResponse>{
    return this.http.get<getImageResponse>(this.apiUrl + "api/User/getImageByUserId?userId=" + id,{headers : this.header});
  }

  updateSkill(skill:skillModel): Observable<any>{
    let request:updateSkillRequest = {
      id: skill.skillId,
      name: skill.name,
      categoryId: "",
      status: skill.status
    }
    return this.http.post(this.apiUrl + "api/Admin/updateSkill",request,{headers : this.header});
  }

  getSkillCollections(): Observable<getSkillCollectionResponse[]>{
    return this.http.get<getSkillCollectionResponse[]>(this.apiUrl + "api/Admin/getAllSkillCollections" , {headers : this.header});
  }

  getProjects(): Observable<getProjectsResponse[]> {
    return this.http.get<getProjectsResponse[]>(this.apiUrl + "api/Project/getProjects",{headers : this.header});
  }

  getUserSkills(id:string): Observable<getUserSkillResponse[]> {
    return this.http.get<getUserSkillResponse[]>(this.apiUrl + "api/User/GetUserSkillsByUserId?userId=" + id,{headers : this.header});
  }
  
  getUsers(): Observable<getUserResponse[]> {
    return this.http.get<getUserResponse[]>(this.apiUrl + "api/User/getAllUsers",{headers : this.header});
  }

  getSkills(): Observable<getSkillsResponse> {
    return this.http.get<getSkillsResponse>(this.apiUrl + "api/Admin/getSkills",{headers : this.header});
  }

  removeSkill(id: string): Observable<removeSkillResponse> {
    let request: removeSkillRequest = {
      skillId: id,
    };

    return this.http.post<removeSkillResponse>(this.apiUrl + "api/Admin/removeSkill",request,{headers : this.header});
  }

  getCategories(): Observable<getCategoriesResponse>{
    return this.http.get<getCategoriesResponse>(this.apiUrl + "api/Admin/getCategories",{headers : this.header});
  }

  updateCategory(id: string,name: string,description: string): Observable<any>{
    return this.http.post<any>(this.apiUrl + "api/Admin/updateCategory",{id:id,name:name,description:description},{headers : this.header});
  }

  removeCategory(id: string): Observable<removeCategoryResponse> {
    let request: removeCategoryRequest = {
      Id: id,
    };

    return this.http.post<removeCategoryResponse>(this.apiUrl + "api/Admin/removeCategory",request,{headers : this.header});

  }

  addCategory(
    name: string,
    description: string
  ): Observable<addCategoryResponse> {
    let request: addCategoryRequest = {
      name: name,
      description: description,
    };

    return this.http.post<addCategoryResponse>(this.apiUrl + "api/Admin/addCategory",request,{headers : this.header});

  }
}
