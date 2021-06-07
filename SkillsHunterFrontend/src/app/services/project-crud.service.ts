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

    getProjects():Observable<Project[]>{
        return this.httpclient.get<Project[]>('http://localhost:5001/api/Project/getProjects'); 
    }
}
