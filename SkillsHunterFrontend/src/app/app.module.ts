import { NgModule } from '@angular/core';
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
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
