import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UpdateprojectComponent } from './updateproject/updateproject.component';

import { ProjectCRUDService } from './services/project-crud.service';

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
    path:'',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProjectCRUDService]
})
export class AppRoutingModule { }
