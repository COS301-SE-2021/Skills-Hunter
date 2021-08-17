import { Component, OnInit } from '@angular/core';
import { Category } from '../classes/Category';
import { mockCategoryData } from '../mock-data/mock-category';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCategoryComponent } from './new-category/new-category.component';

@Component({
  selector: 'app-category-control',
  templateUrl: './category-control.component.html',
  styleUrls: ['./category-control.component.scss']
})
export class CategoryControlComponent implements OnInit {

  data: Category[] = [];
  searchTerm:string = "";
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  viewAll(): void{
    this.data = mockCategoryData;
    this.ngOnInit();
  }

  deleteCategory(category): void{
    for(var count = 0; count < this.data.length;count++){
      if(this.data[count].categoryid == category.categoryid){
        for(var step = count; step < this.data.length - 1; step++){
          this.data[step] = this.data[step + 1];
        }
        this.data.pop();
        break;
      }
    }

    this.ngOnInit();
  }

  add(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '30%';
    configDialog.height = '40%';

    const dialogRef = this.dialog.open(NewCategoryComponent,configDialog);

    dialogRef.afterClosed().subscribe(() => {
      this.data = mockCategoryData;
      this.ngOnInit();
    });    
  }

  Search(): void{
    if(this.searchTerm != ""){
      let tempData:Category[] = mockCategoryData;
      let result: Category = null;
      
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
    }
  }
}
