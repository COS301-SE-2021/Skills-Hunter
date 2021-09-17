import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { CategoryComponent } from './category/category.component';
import { SkillCollectionComponent } from './skill-collection/skill-collection.component';
import { MatIconModule } from '@angular/material/icon';
import { GeneralComponent } from './general/general.component';

@NgModule({
  declarations: [
    UsersComponent,
    ProjectsComponent,
    SkillsComponent,
    CategoryComponent,
    SkillCollectionComponent,
    GeneralComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class DashboardModule { }
