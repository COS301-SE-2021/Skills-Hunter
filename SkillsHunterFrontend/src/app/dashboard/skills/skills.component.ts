import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { categoryModel,skillModel } from '../../api-message-class/message';
import { FormBuilder, Validators } from '@angular/forms';


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

  constructor(private fb: FormBuilder,private modalService: NgbModal,private adminService:AdminService) {
    this.form = fb.group({
      categoryToAdd : ['', Validators.required]
    });
  }

  ngOnInit(): void {
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

  createSkill(): void{

  }

  search(): void{

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

}
