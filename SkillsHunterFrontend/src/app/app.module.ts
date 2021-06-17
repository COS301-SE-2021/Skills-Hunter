import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchCandidateComponent } from './match-candidate/match-candidate.component';
import { CandidateCardComponent } from './match-candidate/candidate-card/candidate-card.component';
import { SearchAndFilterCandidatePipe } from './Pipes/search-and-filter-candidate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateprojectComponent,
    HomeComponent,
    // CandidateComponent,
    MatchCandidateComponent,
    CandidateCardComponent,
    SearchAndFilterCandidatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule, 
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
