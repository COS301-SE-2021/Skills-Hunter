import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { categoryModel, skillModel, getCategoryByIdRequest } from '../../api-message-class/message';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  filter:boolean = false;
  searchTerm: string = "";
  data: skillModel[] = [];
  category: categoryModel[] = [];
  show: skillModel[] = [];
  notificationType: number = 0;
  notification: string = "no message";
  status: number = -1;
  form;
  todoArray:categoryModel[] = [];
  createName: string = "";

  constructor(private fb: FormBuilder,private modalService: NgbModal,private adminService:AdminService,private _snackBar: MatSnackBar) {
    this.form = fb.group({
      categoryToAdd : ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.loadData();

    this.adminService.getCategories().subscribe(apiValue => {
      this.category = apiValue.category;
    },
    error=>{
      this.notification = "An error has occurred while retrieving all categories from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    });
  }

  loadData(): void{
    this.adminService.getSkills().subscribe(apiValue => {
      this.data = apiValue.skills;
      this.show = this.data;
    },
    error=>{
      this.notification = "An error has occurred while retrieving all skills from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    });    
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  onfilter(): void{
    this.filter = !this.filter;

    if(!this.filter)
      this.reset();
  }

  reset(): void{
    this.show = this.data;
  }

  filterData(): void{
    this.show = [];
    for(let count = 0; count < this.data.length; count++){
        if(this.status != -1){
          if(this.status == this.data[count].status)
            this.show.push(this.data[count]);
        }   
    }
  }

  remove(ev:Event,id:string): void{
      ev.stopPropagation();
      this.adminService.removeSkill(id).subscribe(result =>{
        this.loadData();
        
        this._snackBar.open("Successfully removed skill", "",{
          duration: 4000,
        });

      },error=>{
        this._snackBar.open("An error has occurred while removing skill from the server", "",{
          duration: 4000,
        });
     });    
  }

  match(term: string,name: string): boolean{

    if(name.indexOf(term) != -1)
      return true;

    return false;
  }

  search(): void{
    this.show = [];
    if(this.searchTerm != ""){  
      for(let count  = 0; count < this.data.length; count++){
        if(this.match(this.searchTerm.toLowerCase(),this.data[count].name.toLowerCase())){
          this.show.push(this.data[count]);
        }
      } 
    } 
  }

  getCategory(id:string): categoryModel{
    let result:categoryModel;

    for(let count = 0; count < this.category.length; count++){
      if(id == this.category[count].categoryId)
        result = this.category[count];
    }

    return result;
  }

  addTodo(): void {
    let newTodoList:categoryModel = this.getCategory(this.form.value.categoryToAdd);
    this.todoArray.push(newTodoList);
    this.form.reset();
  }

  removeTodoItem(item): void {
   for(let i=0; i<=this.todoArray.length; i++) {
     if(item.categoryId === this.todoArray[i].categoryId) {
       this.todoArray.splice(i, 1);
     }
   } 
  }

  createModal(createModalContent):void{
    this.createName = "";
    this.todoArray = [];
    this.modalService.open( createModalContent );
  }

  saveSkill(): void{
    if(this.createName == ""){
      alert("missing name field.");
    }else if(this.todoArray.length == 0){
      alert("select categories");
    }else{
      let skillCategories:getCategoryByIdRequest[] = [];
      
      for(let count = 0; count < this.todoArray.length; count++){
        skillCategories.push({
          CategoryId : this.todoArray[count].categoryId
        });
      }

      this.adminService.createSkill(this.createName,skillCategories).subscribe(result=>{
        alert("Successfully added skill");
        this.loadData();
        this.ngOnInit();
      },error=>{
        alert("error adding skill");
      })
    }
  }

}
