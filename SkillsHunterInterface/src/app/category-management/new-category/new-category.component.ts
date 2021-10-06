import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Category } from 'src/app/classes/admin';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<NewCategoryComponent>,@Inject(MAT_DIALOG_DATA) public data: Category,private adminService:AdminService) { }

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

    this.adminService.addCategory(this.data.name,this.data.description).subscribe(result =>{
      this.data = result.added;
    });
  }

}
