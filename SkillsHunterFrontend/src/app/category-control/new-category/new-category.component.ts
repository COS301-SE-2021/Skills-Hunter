import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { categoryModel } from 'src/app/api-message-class/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {  
  constructor(
    public dialogRef: MatDialogRef<NewCategoryComponent>,@Inject(MAT_DIALOG_DATA) public data: categoryModel,private adminSerice:AdminService) { }

  ngOnInit(): void {
  }

  onSave(): void {
    if(!this.data.name){
      alert("Please enter name!");
      return;
    }

    if(!this.data.description){
      alert("Please enter description!");
      return;
    }

    this.adminSerice.addCategory(this.data.name,this.data.description).subscribe(result =>{
      this.data = result.added;
    });
  }
}
