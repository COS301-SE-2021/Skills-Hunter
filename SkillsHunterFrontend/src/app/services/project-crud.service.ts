import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {project} from '../classes/project';
import { Project } from '../home/Project';
import { Projects } from '../home/mock-projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectCRUDService {

  constructor(private httpclient: HttpClient) { }

  //external api to create project is called here
  createProject(formData:project):Observable<any>
  {
      // console.log("Req: "+formData.name);
        return this.httpclient.post("http://localhost:5000/api/Project/createProject",formData);
  }

  //external api to update project is called here
  updateProject(formData:project):Observable<any>
  {
    return this.httpclient.post("http://localhost:5000/api/Project/createProject",formData);

  }

  //external api to delete project is called here
  deleteProject(formData:project):Observable<any>
  {
    return this.httpclient.post("http://localhost:5000/api/Project/createProject",formData)
  }
  
  //external api to read project is called here
  getProjects():Observable<Project[]>{
        return this.httpclient.get<Project[]>('http://localhost:5000/api/Project/getProjects'); 
    }
}
