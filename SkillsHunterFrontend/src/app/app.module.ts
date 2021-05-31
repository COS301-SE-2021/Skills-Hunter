import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCRUDService } from './services/project-crud.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateprojectComponent,
    UpdateprojectComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProjectCRUDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
