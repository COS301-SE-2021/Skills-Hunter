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

  constructor(private httpclient: HttpClient) { }

  endPoint = 'http://localhost:5000/api/';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

adminGetSkills(): Observable<Skill[]> {
  return this.httpclient.get<Skill[]>(this.endPoint+'Admin/getSkills');
}

adminAddSkill(formData: Skill): Observable<Skill> {
  console.log(formData);
  return this.httpclient.post<Skill>(this.endPoint+'Admin/addSkill', JSON.stringify(formData), this.httpHeader);
}

adminRemoveSkill(formData: Skill): Observable<Skill> {
  return this.httpclient.post<Skill>(this.endPoint+'Admin/removeSkill', formData.SkillId, this.httpHeader);
}

}
