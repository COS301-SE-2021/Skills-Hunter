import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppComponent } from 'NgxMatMSAutocomplete/src/app/app.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { AdminAddSkillComponent } from './admin-portal/admin-add-skill/admin-add-skill.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoryControlComponent } from './category-control/category-control.component';
import { NewCategoryComponent } from './category-control/new-category/new-category.component';
import { AddSkillCategoryComponent } from './createproject/add-skill-category/add-skill-category.component';
import { AddSkillCollectionComponent } from './createproject/add-skill-collection/add-skill-collection.component';
import { CollectionCardComponent } from './createproject/add-skill-collection/collection-card/collection-card.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { HomeComponent } from './home/home.component';
import { ProjectCardComponent } from './home/project-card/project-card.component';
import { LoginComponent } from './login/login.component';
import { CandidateCardComponent } from './match-candidate/candidate-card/candidate-card.component';
import { MatchCandidateComponent } from './match-candidate/match-candidate.component';
import { MaterialModule } from './material/material.module';
import { SearchAndFilterCandidatePipe } from './Pipes/search-and-filter-candidate.pipe';
import { AddSkillComponent } from './profile/add-skill/add-skill.component';
import { ProfileImgComponent } from './profile/profile-img/profile-img.component';
import { ProfileComponent } from './profile/profile.component';
import { SliderComponent } from './profile/slider/slider.component';
import { RegisterComponent } from './register/register.component';
import { SkillCardComponent } from './skill-control/skill-card/skill-card.component';
import { SkillControlComponent } from './skill-control/skill-control.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ShowSkillsComponent } from './user-control/show-skills/show-skills.component';
import { UserCardComponent } from './user-control/user-card/user-card.component';
import { UserControlComponent } from './user-control/user-control.component';

/*import { NgModule } from '@angular/core';
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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { NgxMatMSAutocompleteModule } from 'ngx-mat-msautocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ProfileComponent } from './profile/profile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserControlComponent } from './user-control/user-control.component';
import { SkillControlComponent } from './skill-control/skill-control.component';
import { CategoryControlComponent } from './category-control/category-control.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserCardComponent } from './user-control/user-card/user-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SkillCardComponent } from './skill-control/skill-card/skill-card.component';
import { NewCategoryComponent } from './category-control/new-category/new-category.component';
import { ShowSkillsComponent } from './user-control/show-skills/show-skills.component';
import { AddSkillComponent } from './profile/add-skill/add-skill.component';
import { SliderComponent } from './profile/slider/slider.component';
import { ProfileImgComponent } from './profile/profile-img/profile-img.component'; */

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
    AddSkillCategoryComponent,
    AddSkillCollectionComponent,
    CollectionCardComponent,
    AddSkillsComponent,
    ProfileComponent,
    UserControlComponent,
    SkillControlComponent,
    CategoryControlComponent,
    UserCardComponent,
    SkillCardComponent,
    NewCategoryComponent,
    ShowSkillsComponent,
    AddSkillComponent,
    SliderComponent,
    ProfileImgComponent,
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
    NgMultiSelectDropDownModule.forRoot(),
    // NgxMatMSAutocompleteModule,
    AngularMultiSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
