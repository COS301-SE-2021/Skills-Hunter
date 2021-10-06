import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCategoryComponent } from './new-category/new-category.component';
import { Category, skill } from '../classes/admin';
import { AdminService } from '../services/admin/admin.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {

  
  data: Category[] = [];
  searchTerm:string = "";
  
  constructor(public dialog: MatDialog,private adminService: AdminService) { }

  ngOnInit(): void {
    document.getElementById('tool').style.display = "block";
    document.getElementById('side').style.display = "block";
    document.getElementById('userlist').style.display = "none"; 
    document.getElementById('house').style.display = "none";
  }

  viewAll(): void{
    this.adminService.getCategories().subscribe(apiValue => {
      this.data = apiValue.category;
      this.ngOnInit();
    });
  }

  deleteCategory(category: Category): void{
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
    let tmp: Category = {
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
        let tempData:Category[] = apiValue.category;
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
      });
    }
  }

}
