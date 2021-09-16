import { Category } from './../classes/Category';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Project } from '../classes/Project';
import { Skill } from '../classes/Skill';

@Injectable({
  providedIn: 'root',
})
export class ProjectCRUDService {
  constructor(private httpclient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  //external api to create project is called here
  createProject(formData: any): Observable<any> {
    return this.httpclient.post(
      'http://localhost:5000/api/Project/createProject',
      formData,
      this.httpOptions
    );
  }

  //external api to update project is called here
  updateProject(formData: any): Observable<any> {
    return this.httpclient.put(
      'http://localhost:5000/api/Project/updateProject',
      formData,
      this.httpOptions
    );
  }

  //external api to delete project is called here
  deleteProject(id): Observable<any> {
    let obj = {
      projectId: id,
    };
    return this.httpclient.post(
      'http://localhost:5000/api/Project/deleteProject/',
      obj,
      this.httpOptions
    );
  }

  //external api to read project is called here
  getAllProjects(): Observable<any[]> {
    return this.httpclient.get<any[]>(
      'http://localhost:5000/api/Project/getProjects',
      this.httpOptions
    );
  }

  //external api to read project is called here
  getProjectsByProjectOwnerId(): Observable<any[]> {
    return this.httpclient.get<any[]>(
      'http://localhost:5000/api/Project/getProjectsByOwnerId',
      this.httpOptions
    );
  }

  obtainMatchingCandidates(formData: any): Observable<any[]> {
    return this.httpclient.get<any[]>(
      'localhost:5000/api/Project/MatchCandidates?projectId=' + formData,
      this.httpOptions
    );
  }

  inviteCandidate(formData): Observable<any[]> {
    return this.httpclient.post<any[]>(
      'http://localhost:5000/api/Project/inviteCandidate',
      formData,
      this.httpOptions
    );
  }

  applyForProject(formData: any): Observable<any> {
    return this.httpclient.post(
      'http://localhost:5000/api/Project/applyForProject',
      formData,
      this.httpOptions
    );
  }

  updateUser(formData: any): Observable<any> {
    return this.httpclient.post(
      'http://localhost:5000/api/User/update',
      formData,
      this.httpOptions
    );
  }

  getMyUserID(): Observable<any> {
    return this.httpclient.get(
      'http://localhost:5000/api/User/getCurrentUserId',
      this.httpOptions
    );
  }

  getSkills(): Observable<Skill> {
    return this.httpclient.get<Skill>(
      'http://localhost:5000/api/Admin/getSkills',
      this.httpOptions
    );
  }

  getCategories(): Observable<Category> {
    return this.httpclient.get<Category>(
      'http://localhost:5000/api/Admin/getCategories',
      this.httpOptions
    );
  }

  getCollections(): Observable<any> {
    return this.httpclient.get<any>(
      'http://localhost:5000/api/Admin/getAllSkillCollections',
      this.httpOptions
    );
  }

  getIndividualsSkills() {
    return this.httpclient.get(
      'http://localhost:5000/api​/User​/GetUserSkillsByUserId',
      this.httpOptions
    );
  }

  getProject(formData: any) {
    return this.httpclient.get(
      'http://localhost:5000/api​/Project/getProject',
      this.httpOptions
    );
  }
}
