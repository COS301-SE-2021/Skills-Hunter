import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import { ProjectComponent } from './home/project/project.component';
import { ProjectItemComponent } from './home/project-item/project-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCRUDService } from './services/project-crud.service';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { BrowserModule } from '@angular/platform-browser';
import { CandidateComponent } from './updateproject/candidate/candidate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateprojectComponent,
    UpdateprojectComponent,
    HomeComponent,
    ProjectComponent,
    ProjectItemComponent
    CandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [ProjectCRUDService],
    MaterialModule, 
    BrowserAnimationsModule 
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
