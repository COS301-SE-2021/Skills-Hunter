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
  skillCollection : string[];

  // let skillArray = Skill[] = Skills;
  skillArray = ["C++", "Java", "Python", "Flutter"];
  

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
    console.log(this.skillCollection+"\n");

    // let col = {
    //   collectionId: "random-id",
    //   collectionName: this.collectionName,
    //   skills: this.skillCollection
    // };

    // this._collections.push(col);    
  }
}
