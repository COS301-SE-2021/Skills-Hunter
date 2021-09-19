import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { getAllCollectionModel, categoryModel, skillModel, createCollectionRequest, existingSkillModel} from '../../api-message-class/message';

@Component({
  selector: 'app-skill-collection',
  templateUrl: './skill-collection.component.html',
  styleUrls: ['./skill-collection.component.scss']
})
export class SkillCollectionComponent implements OnInit {
  searchTerm: string = "";
  notification: string = "";
  skills: skillModel[] = [];
  notificationType: number = 0;
  form;
  todoArray:skillModel[] = [];
  createName: string = "";
  createDescription: string = "";
  createWeight: string = "";
  data: getAllCollectionModel[];

  constructor(private modalService: NgbModal,fb: FormBuilder,private adminService:AdminService) {
    this.form = fb.group({
      skillToAdd : ['', Validators.required]
    });
    this.loadData();
  }

  ngOnInit(): void {
    this.adminService.getSkills().subscribe(result => {
      this.skills = result.skills;
    },
    error=>{
      alert("An error has occurred while retrieving all skills from server");
    
    });
  }

  search(): void{

  }

  loadData():void{
    this.adminService.getAllCollection().subscribe(result =>{
        this.data = result;
    },
    error=>{
      alert("An error has occurred while retrieving collections from server");
    
    });
  }

  createModal(createModalContent):void{
    this.createName = "";
    this.createDescription = "";
    this.createWeight = "";
    this.todoArray = [];
    this.modalService.open( createModalContent );
  }

  getSkill(id:string): skillModel{
    let result:skillModel;

    for(let count = 0; count < this.skills.length; count++){
      if(id == this.skills[count].skillId)
        result = this.skills[count];
    }

    return result;
  }

  addTodo(): void {
    let newTodoList:skillModel = this.getSkill(this.form.value.skillToAdd);
    this.todoArray.push(newTodoList);
    this.form.reset();
  }

  removeTodoItem(item): void {
   for(let i=0; i<=this.todoArray.length; i++) {
     if(item.skillId === this.todoArray[i].skillId) {
       this.todoArray.splice(i, 1);
     }
   } 
  }

  saveCollection(): void {
    if(this.createName == "" || this.createDescription == "" || this.createWeight == ""){

      if(this.createName == "")
        alert("missing name field");

      if(this.createDescription == "")
        alert("missing description field");

      if(this.createWeight == "")
        alert("missing weight field");
    }else{
      let request:createCollectionRequest = {
        name : this.createName,
        description : this.createDescription,
        weight : parseInt(this.createWeight),
        skills : []        
      };
      
      for(let count = 0; count < this.todoArray.length; count++){
        request.skills.push({skillId : this.todoArray[count].skillId, weight: 0});
      }

      this.adminService.createCollection(request).subscribe(result=>{
        
      },error=>{
        alert("error creating collection");
      });
    }
  }

}
