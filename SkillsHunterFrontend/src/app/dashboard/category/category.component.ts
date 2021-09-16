import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { categoryModel, skillModel } from '../../api-message-class/message';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  filter:boolean = false;
  create:boolean = false;
  searchTerm: string = "";
  data: categoryModel[] = [];
  show: categoryModel[] = [];
  notificationType: number = 0;
  notification: string = "no message";
  createName: string = "";
  createDescription: string = "";

  constructor(private modalService: NgbModal,private adminService: AdminService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  match(term: string,name: string,description: string): boolean{
    
    if(name.indexOf(term) != -1)
      return true;
    
    if(description.indexOf(term) != -1)
      return true;    
    
    return false;
  }

  search(): void{
    this.show = [];
    if(this.searchTerm != ""){
      for(let count  = 0; count < this.data.length; count++){
        if(this.match(this.searchTerm.toLowerCase(),this.data[count].name.toLowerCase(),this.data[count].description.toLowerCase())){
          this.show.push(this.data[count]);
        }
      }
    } 
  }

  edit(): void{
    alert("edit")
  }

  close(ev:Event): void{
    ev.stopPropagation();
  }

  createModal(createModalContent):void{
    this.modalService.open( createModalContent );
  }

  saveCategory(createModalContent):void{
    if(this.createName == "" || this.createDescription == ""){
        this._snackBar.open("Empty field detected", "",{
          duration: 4000,
        });
    }else{
      this.adminService.addCategory(this.createName,this.createDescription).subscribe(result =>{
        
        this._snackBar.open("Successfully created new category", "",{
          duration: 4000,
        });

      },error=>{
        this._snackBar.open("An error has occurred while creating category on the server", "",{
          duration: 4000,
        });
     });

    }
  }

  loadData():void{
    this.adminService.getCategories().subscribe(result =>{
        this.data = result.category;
        this.show = result.category; 
    },
    error=>{
      this.notification = "An error has occurred while retrieving all categories from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    });
  }

}
