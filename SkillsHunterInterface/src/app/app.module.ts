import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

//Fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ProjectManagementComponent } from './project-management/project-management.component';
import { UpdateProjectComponent } from './project-management/update-project/update-project.component';

import { SkillManagementComponent } from './skill-management/skill-management.component';
import { EditSkillComponent } from './skill-management/edit-skill/edit-skill.component';
import { SkillComponent } from './skill-management/skill/skill.component';
import { AddSkillComponent } from './skill-management/add-skill/add-skill.component';
import { CreateProjectComponent } from './project-management/create-project/create-project.component';
import { SkillAdvancedSearchComponent } from './skill-management/skill-advanced-search/skill-advanced-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ToolBarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CreateProjectComponent,
    ProjectManagementComponent,
    UpdateProjectComponent,
    SkillManagementComponent,
    EditSkillComponent,
    SkillComponent,
    AddSkillComponent,
    SkillAdvancedSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatDialogModule,
    MatRadioModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}} // for dialogs
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
