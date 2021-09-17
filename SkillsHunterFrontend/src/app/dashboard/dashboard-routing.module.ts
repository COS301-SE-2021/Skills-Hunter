import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillCollectionComponent } from './skill-collection/skill-collection.component';
import { SkillsComponent } from './skills/skills.component';
import { UsersComponent } from './users/users.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  { path: '',component: GeneralComponent },
  { path: 'users', component: UsersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skill-collection', component: SkillCollectionComponent },
  { path: 'general', component: GeneralComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
