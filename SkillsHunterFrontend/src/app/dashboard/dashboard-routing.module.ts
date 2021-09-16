import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillCollectionComponent } from './skill-collection/skill-collection.component';
import { SkillsComponent } from './skills/skills.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '',component: UsersComponent},
  { path: 'users', component: UsersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skill-collection', component: SkillCollectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
