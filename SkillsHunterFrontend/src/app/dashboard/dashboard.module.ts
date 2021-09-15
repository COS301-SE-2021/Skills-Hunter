import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { CategoryComponent } from './category/category.component';
import { SkillCollectionComponent } from './skill-collection/skill-collection.component';


@NgModule({
  declarations: [
    UsersComponent,
    ProjectsComponent,
    SkillsComponent,
    CategoryComponent,
    SkillCollectionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
