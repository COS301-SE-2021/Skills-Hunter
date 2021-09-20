import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectRoutingModule } from './create-project-routing.module';
import { CreationComponent } from './creation/creation.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreationComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    CreateProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateProjectModule { }
 