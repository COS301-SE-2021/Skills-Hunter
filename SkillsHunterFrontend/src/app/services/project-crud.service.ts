import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Project } from '../classes/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectCRUDService {
  constructor(private httpclient: HttpClient) {}

  //external api to create project is called here
  createProject(formData: Project): Observable<any> {
    // console.log("Req: "+formData.name);
    return this.httpclient.post(
      'http://localhost:5000/api/Project/createProject',
      formData
    );
  }

  //external api to update project is called here
  updateProject(formData: Project): Observable<any> {
    return this.httpclient.post(
      'http://localhost:5000/api/Project/createProject',
      formData
    );
  }

  //external api to delete project is called here
  deleteProject(id): Observable<any> {
    let obj={
      "projectId":id
    }
    return this.httpclient.post(
      'http://localhost:5000/api/Project/deleteProject/',obj
    );
  }

  //external api to read project is called here
  getProjects(): Observable<Project[]> {
    return this.httpclient.get<Project[]>(
      'http://localhost:5000/api/Project/getProjects'
    );
  }

  inviteCandidate(formData): Observable<Project[]> {
    return this.httpclient.post<Project[]>(
      'http://localhost:5000/api/Project/inviteCandidate', formData 
    );
  }

  apply(formData):Observable <any>{
    return this.httpclient.post(
      'http://localhost:5000/api/Project/applyForProject',
      formData
    );
  }

}
