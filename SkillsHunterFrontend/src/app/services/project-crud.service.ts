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
       let obj={
            table:"FloorPlan",
            request:"create",
            data:project
        };
        console.log("posted data ",obj);
        return this.httpclient.post("http://localhost:65000/",obj);
    }

    getProjects():Observable<Project[]>{
        //return of(Projects);
        return this.httpclient.get<Project[]>('http://localhost:5001/api/Project/getProjects'); 
    }
}
