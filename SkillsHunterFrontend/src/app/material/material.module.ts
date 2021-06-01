import { NgModule } from  '@angular/core'; 
import {MatDatepickerModule} from  '@angular/material/datepicker';
import {MatRadioModule} from  '@angular/material/radio';
import {MatSelectModule} from  '@angular/material/select';
import {MatSliderModule} from  '@angular/material/slider';
import {MatDividerModule} from  '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card'; 
// MatCardModule

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [MatDividerModule, MatSliderModule,MatSelectModule,MatRadioModule,MatDatepickerModule, MatButtonModule, MatBadgeModule, BrowserAnimationsModule, MatExpansionModule, MatListModule, MatMenuModule, MatCardModule],
  exports: [MatDividerModule, MatSliderModule,MatSelectModule,MatRadioModule,MatDatepickerModule, MatButtonModule, MatBadgeModule, BrowserAnimationsModule, MatExpansionModule, MatListModule, MatMenuModule, MatCardModule],
})
export class MaterialModule { }
