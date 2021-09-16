import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { CategoryComponent } from './category/category.component';
import { SkillCollectionComponent } from './skill-collection/skill-collection.component';
import { MatIconModule } from '@angular/material/icon';

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
    DashboardRoutingModule,
    NgbModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
