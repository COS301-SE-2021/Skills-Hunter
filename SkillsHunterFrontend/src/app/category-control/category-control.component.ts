import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCategoryComponent } from './new-category/new-category.component';
import { categoryModel } from '../api-message-class/message';
import {AdminService } from '../services/admin.service';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-control',
  templateUrl: './category-control.component.html',
  styleUrls: ['./category-control.component.scss']
})
export class CategoryControlComponent implements OnInit {

  data: categoryModel[] = [];
  searchTerm:string = "";
  constructor(public dialog: MatDialog,private adminService: AdminService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private _snackBar: MatSnackBar) { 
    iconRegistry.addSvgIcon('all', sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/all.svg'));
  }

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
    },error=>{
      this._snackBar.open("An error occurred on the server while processing request","",{
        duration: 2000
      });
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
    },error=>{
      this._snackBar.open("An error occurred on the server while processing request","",{
        duration: 2000
      });
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
      },error=>{
        this._snackBar.open("An error occurred on the server while processing request","",{
          duration: 2000
        });
      });
    }
  }
}
