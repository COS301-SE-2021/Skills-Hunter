import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateProjectComponent } from './project-management/create-project/create-project.component';
import { UpdateProjectComponent } from './project-management/update-project/update-project.component';
import { SignupComponent } from './signup/signup.component';
import { SkillManagementComponent } from './skill-management/skill-management.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'createProject',
    component: CreateProjectComponent
  },
  {
    path:'skillManagement',
    component: SkillManagementComponent
  },
  {
    path:'updateProject',
    component: UpdateProjectComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
