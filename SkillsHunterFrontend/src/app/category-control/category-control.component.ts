import { Component, OnInit } from '@angular/core';
import { Category } from '../classes/Category';
import { mockCategoryData } from '../mock-data/mock-category';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCategoryComponent } from './new-category/new-category.component';
import { categoryModel, skillModel } from '../api-message-class/message';
import {AdminService } from '../services/admin.service';

@Component({
  selector: 'app-category-control',
  templateUrl: './category-control.component.html',
  styleUrls: ['./category-control.component.scss']
})
export class CategoryControlComponent implements OnInit {

  data: categoryModel[] = [];
  searchTerm:string = "";
  constructor(public dialog: MatDialog,private adminService: AdminService) { }

  ngOnInit(): void {
  }

  viewAll(): void{
    this.adminService.getCategories().subscribe(apiValue => {
      this.data = apiValue.category;
      this.ngOnInit();
    });
  }

  deleteCategory(category: categoryModel): void{
    this.adminService.removeCategory(category.categoryId).subscribe(apiValue => {
      for(var count = 0; count < this.data.length;count++){
        if(this.data[count].categoryId == category.categoryId){
          for(var step = count; step < this.data.length - 1; step++){
            this.data[step] = this.data[step + 1];
          }
          this.data.pop();
          break;
        }
      }
  
      this.ngOnInit();
    });
  }

  add(): void{
    let tmp: categoryModel = {
      categoryId : "",
      name: "",
      description: ""
    };

    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '30%';
    configDialog.height = '40%';
    configDialog.data = tmp;

    const dialogRef = this.dialog.open(NewCategoryComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.data.push(result);
      this.ngOnInit();
    });    
  }

  Search(): void{
    if(this.searchTerm != ""){
      this.adminService.getCategories().subscribe(apiValue => {
        let tempData:categoryModel[] = apiValue.category;
        let result: categoryModel = null;
        
        for(let count  = 0; count < tempData.length; count++){
          if(tempData[count].name == this.searchTerm){
            result = tempData[count];
            break;
          }
        }
  
        if(result != null){
          this.data = [];
          this.data.push(result);
          this.ngOnInit();
        }else{
          this.data = [];
          this.ngOnInit();
        }
      });
    }
  }
}
