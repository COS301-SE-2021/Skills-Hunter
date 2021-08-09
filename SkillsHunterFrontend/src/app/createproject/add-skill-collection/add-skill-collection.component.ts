import { Collection } from './../../classes/Collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Collections } from 'src/app/mock-data/mock-collections';
import { Skill } from 'src/app/classes/Skill';
import { Skills } from 'src/app/mock-data/mock-skills';

@Component({
  selector: 'app-add-skill-collection',
  templateUrl: './add-skill-collection.component.html',
  styleUrls: ['./add-skill-collection.component.scss']
})
export class AddSkillCollectionComponent implements OnInit {

  _collections: Collection[] = Collections;

  collectionName : string;
  collectionWeight : number = 1;
  // skillCollection : Skill[];

  skillCollection : string[];


  skillArray = Skills;

  collectionFormGroup : FormGroup;

  formatLabel(value: number) {
    return value;
  }

  constructor(private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.collectionFormGroup = this.formBuilder.group(
      {
        collectionName : ['', Validators.required],
        // collectionWeight : ['', Validators.required],
        // collectionSkills : ['', Validators.required]
      }
    );
  }

  captureCollection(){
    console.log(this.collectionName+"\n");
    console.log(this.collectionWeight+"\n");
    // this.skillCollection.forEach(element => {
    //   console.log(element.SkillName+"\n");
    // });

    
    var col = new Collection();
  
    col.collectionId = "random-id"+this.skillCollection.length,
    col.collectionName = this.collectionName;
    col.skills = this.skillCollection.toString();

    Collections.push(col);
    // this._collections.push(col);    
  }
}
