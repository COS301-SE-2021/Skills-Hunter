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
// import { SearchAndFilterCandidatePipe } from './Pipes/search-and-filter-candidate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ProjectCardComponent } from './home/project-card/project-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminAddSkillComponent } from './admin-portal/admin-add-skill/admin-add-skill.component';
import { AddSkillCategoryComponent } from './createproject/add-skill-category/add-skill-category.component';
import { AddSkillCollectionComponent } from './createproject/add-skill-collection/add-skill-collection.component';
import { CollectionCardComponent } from './createproject/add-skill-collection/collection-card/collection-card.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryControlComponent } from './category-control/category-control.component';
import { ShowProjectCollectionComponent } from './createproject/add-skill-collection/collection-card/show-project-collection/show-project-collection.component';
import { ShowProjectSkillComponent } from './createproject/add-skill-collection/collection-card/show-project-skill/show-project-skill.component';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';
import { AddSkillComponent } from './profile/add-skill/add-skill.component';
import { ProfileComponent } from './profile/profile.component';
import { SliderComponent } from './profile/slider/slider.component';
import { AdminProjectCardComponent } from './project-control/admin-project-card/admin-project-card.component';
import { ProjectControlComponent } from './project-control/project-control.component';
import { SkillCollectionControlComponent } from './skill-collection-control/skill-collection-control.component';
import { EditSkillComponent } from './skill-control/edit-skill/edit-skill.component';
import { NewSkillComponent } from './skill-control/new-skill/new-skill.component';
import { SkillCardComponent } from './skill-control/skill-card/skill-card.component';
import { SkillControlComponent } from './skill-control/skill-control.component';
import { ShowSkillsComponent } from './user-control/show-skills/show-skills.component';
import { UserAdvancedSearchComponent } from './user-control/user-advanced-search/user-advanced-search.component';
import { UserCardComponent } from './user-control/user-card/user-card.component';
import { UserControlComponent } from './user-control/user-control.component';

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
    // SearchAndFilterCandidatePipe,
    UpdateProjectComponent,
    ProjectCardComponent,
    AdminPortalComponent,
    AdminAddSkillComponent,
    AddSkillCategoryComponent,
    AddSkillCollectionComponent,
    CollectionCardComponent,
    AddSkillsComponent,
    AddSkillsCollectionComponent,
    ProfileComponent,
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
    ShowSkillsComponent,
    AddSkillComponent,
    SliderComponent,
    ProfileImgComponent,
    ShowProjectSkillComponent,
    AddSkillCategoryComponent,
    AddSkillCollectionComponent,
    ShowProjectCollectionComponent,
    NewSkillComponent,
    NotificationMenuComponent,
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
    MatChipsModule,
    SelectDropDownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
