import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatchCandidateComponent } from './match-candidate/match-candidate.component';
import { CandidateCardComponent } from './match-candidate/candidate-card/candidate-card.component';
import { SearchAndFilterCandidatePipe } from './Pipes/search-and-filter-candidate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCRUDService } from './services/project-crud.service';
import { RegisterComponent } from './register/register.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ProjectCardComponent } from './home/project-card/project-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminAddSkillComponent } from './admin-portal/admin-add-skill/admin-add-skill.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { AddSkillsCollectionComponent } from './add-skills-collection/add-skills-collection.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { BoardContentComponent } from './board-content/board-content.component';
import { MatButtonModule } from '@angular/material/button';
import { ProjectControlComponent } from './project-control/project-control.component';
import { UserControlComponent } from './user-control/user-control.component';
import { SkillControlComponent } from './skill-control/skill-control.component';
import { CategoryControlComponent } from './category-control/category-control.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SkillCollectionControlComponent } from './skill-collection-control/skill-collection-control.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserAdvancedSearchComponent } from './user-control/user-advanced-search/user-advanced-search.component';
import { UserCardComponent } from './user-control/user-card/user-card.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SkillCardComponent } from './skill-control/skill-card/skill-card.component';
import { AdminProjectCardComponent } from './project-control/admin-project-card/admin-project-card.component';
import { ProjectAdvancedSearchComponent } from './project-control/project-advanced-search/project-advanced-search.component';
import { CategoryCardComponent } from './category-control/category-card/category-card.component';
import { NewCategoryComponent } from './category-control/new-category/new-category.component';
import { StatsBarComponent } from './statistics/stats-bar/stats-bar.component';
import { ImageDisplayComponent } from './user-control/image-display/image-display.component';
import { SkillAdvancedSearchComponent } from './skill-control/skill-advanced-search/skill-advanced-search.component';
import { EditSkillComponent } from './skill-control/edit-skill/edit-skill.component';
import { StatsComponent } from './stats/stats.component';
import { SkillCollectionCardComponent } from './skill-collection-control/skill-collection-card/skill-collection-card.component';
import { SkillCollectionAdvancedSearchComponent } from './skill-collection-control/skill-collection-advanced-search/skill-collection-advanced-search.component';
import { InviteCandidateComponent } from './match-candidate/candidate-card/invite-candidate/invite-candidate.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateprojectComponent,
    UpdateProjectComponent,
    HomeComponent,
    RegisterComponent,
    MatchCandidateComponent,
    CandidateCardComponent,
    SearchAndFilterCandidatePipe,
    UpdateProjectComponent,
    ProjectCardComponent,
    AdminPortalComponent,
    AdminAddSkillComponent,
    AddSkillsComponent,
    AddSkillsCollectionComponent,
    SidebarComponent,
    AdminBoardComponent,
    BoardContentComponent,
    ProjectControlComponent,
    UserControlComponent,
    SkillControlComponent,
    CategoryControlComponent,
    StatisticsComponent,
    SkillCollectionControlComponent,
    UserAdvancedSearchComponent,
    UserCardComponent,
    SkillCardComponent,
    AdminProjectCardComponent,
    ProjectAdvancedSearchComponent,
    CategoryCardComponent,
    NewCategoryComponent,
    StatsBarComponent,
    ImageDisplayComponent,
    SkillAdvancedSearchComponent,
    EditSkillComponent,
    StatsComponent,
    SkillCollectionCardComponent,
    SkillCollectionAdvancedSearchComponent,
    InviteCandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
