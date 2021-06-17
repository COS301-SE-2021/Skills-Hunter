import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { HomeComponent } from './home/home.component';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { BrowserModule } from '@angular/platform-browser';
import { CandidateComponent } from './updateproject/candidate/candidate.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateprojectComponent,
    UpdateprojectComponent,
    HomeComponent,
    CandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule, 
    BrowserAnimationsModule, 
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
