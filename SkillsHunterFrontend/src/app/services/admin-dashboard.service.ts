import { Skill } from 'src/app/classes/Skill';
import { AdminAddSkillComponent } from './../admin-portal/admin-add-skill/admin-add-skill.component';
import { AdminPortalComponent } from './../admin-portal/admin-portal.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/api/';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  adminGetSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl+'Admin/getSkills');
  }

  adminAddSkill(formData: Skill): Observable<Skill> {
    console.log(formData);
    return this.http.post<Skill>(this.apiUrl+'Admin/addSkill', JSON.stringify(formData), this.httpHeader);
  }

  adminRemoveSkill(formData: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl+'Admin/removeSkill', formData.SkillId, this.httpHeader);
  }


}
