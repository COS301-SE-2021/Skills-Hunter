import { Collection } from './../../classes/Collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Collections } from 'src/app/mock-data/mock-collections';

@Component({
  selector: 'app-add-skill-collection',
  templateUrl: './add-skill-collection.component.html',
  styleUrls: ['./add-skill-collection.component.scss']
})
export class AddSkillCollectionComponent implements OnInit {

  _collections: Collection[] = Collections;

  category : string;

  constructor() {}

  ngOnInit(): void {
  }

  panelOpenState = false;

  addSKill(){

  }
  
  cancel(){

  }

}
