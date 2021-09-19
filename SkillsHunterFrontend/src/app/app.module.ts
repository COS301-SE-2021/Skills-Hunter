import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule,NoopAnimationsModule,} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatchCandidateComponent } from './match-candidate/match-candidate.component';
import { CandidateCardComponent } from './match-candidate/candidate-card/candidate-card.component';
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
import { ProfileComponent } from './profile/profile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { MatDialogModule } from '@angular/material/dialog';
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
import { ShowSkillsComponent } from './user-control/show-skills/show-skills.component';
import { AddSkillComponent } from './profile/add-skill/add-skill.component';
import { SliderComponent } from './profile/slider/slider.component';
import { ProfileImgComponent } from './profile/profile-img/profile-img.component';
import { ShowProjectSkillComponent } from './project-control/show-project-skill/show-project-skill.component';
import { AddSkillCategoryComponent } from './createproject/add-skill-category/add-skill-category.component';
import { AddSkillCollectionComponent } from './createproject/add-skill-collection/add-skill-collection.component';
import { MatChipsModule } from '@angular/material/chips';
import { ShowProjectCollectionComponent } from './project-control/show-project-collection/show-project-collection.component';
import { NewSkillComponent } from './skill-control/new-skill/new-skill.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoComponent } from './todo/todo.component';
import { WorkExpComponent } from './profile/work-exp/work-exp.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
    UpdateProjectComponent,
    ProjectCardComponent,
    AdminPortalComponent,
    AdminAddSkillComponent,
    AddSkillsComponent,
    AddSkillsCollectionComponent,
    ProfileComponent,
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
    SpinnerComponent,
    ContentAnimateDirective,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
<<<<<<< HEAD
    TodoComponent
=======
    WorkExpComponent
>>>>>>> ae17defcdea323b45d341432126e37d489280446
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
    BrowserAnimationsModule,
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
    NgbModule,
    MatSnackBarModule ,
    MatNativeDateModule
  ],
  providers: [MatNativeDateModule,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
