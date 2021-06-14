import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { ProjectSearchComponent } from './project-search/project-search.component';

const routes: Routes = [
  
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'updateproject',
    component:UpdateprojectComponent
  },
  {
    path:'candidate-search',
    component:CandidateSearchComponent
  },
  {
    path:'project-search',
    component:ProjectSearchComponent
  },
  // {
  //   path:'',
  //   component:ProjectSearchComponent
  // }
  {
    path:'',
    component:UpdateprojectComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
