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

adminAddSkill(formData: Skill): Observable<any> {
  return this.httpclient.post<Skill>(this.endPoint+'Admin/addSkill', JSON.stringify(Skill), this.httpHeader);
}

//send request to back end to validate user login details
adminRemoveSkill(formData: Skill): Observable<any> {
  return this.httpclient.delete<Skill>(this.endPoint + 'Admin/removeSkill&skillId=' + formData.SkillId, this.httpHeader);
}

}
