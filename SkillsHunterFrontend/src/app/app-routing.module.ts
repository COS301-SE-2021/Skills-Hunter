import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatchCandidateComponent } from './match-candidate/match-candidate.component';
import { RegisterComponent } from './register/register.component';
import { ProjectCRUDService } from './services/project-crud.service';
import { projectService } from './services/project-edit.service';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminAddSkillComponent } from './admin-portal/admin-add-skill/admin-add-skill.component';
import { CreateprojectComponent } from './createproject/createproject.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'match-candidate',
    component: MatchCandidateComponent,
  },
  {
    path: 'update-project',
    component: UpdateProjectComponent,
  },
  {
    path: 'admin-portal',
    component: AdminPortalComponent,
  },
  {
    path: 'admin-add-skill',
    component: AdminAddSkillComponent,
  },
  {
    path: 'createproject',
    component: CreateprojectComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProjectCRUDService, projectService],
})
export class AppRoutingModule {}
