import { Skill } from 'src/app/classes/Skill';
import { AdminAddSkillComponent } from './../admin-portal/admin-add-skill/admin-add-skill.component';
import { AdminPortalComponent } from './../admin-portal/admin-portal.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private httpclient: HttpClient) { }

//send request to back end to validate user login details
adminAddSkill(formData: Skill): Observable<any> {
  return this.httpclient.post(
    'http://localhost:5000/api/Admin/addSkill',
    formData
  );
}

}
