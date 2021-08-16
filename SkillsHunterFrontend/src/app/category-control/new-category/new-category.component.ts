import { Component, OnInit } from '@angular/core';
import { Category } from '../../classes/Category';
import { mockCategoryData } from 'src/app/mock-data/mock-category';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  name: string;
  description: string;
  
  constructor(
    public dialogRef: MatDialogRef<NewCategoryComponent>) { }

  ngOnInit(): void {
  }

  onSave(): void {
    if(!this.name){
      alert("Please enter name!");
      return;
    }

    if(!this.description){
      alert("Please enter description!");
      return;
    }

    let cat: Category = {
      categoryid : '9',
      name : this.name,
      description : this.description
    }

    mockCategoryData.push(cat);
    
    this.dialogRef.close();
  }
}
