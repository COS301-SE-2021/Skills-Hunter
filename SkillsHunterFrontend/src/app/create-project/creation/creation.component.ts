import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { skillModel } from '../../api-message-class/message';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {
  form;
  todoArray:skillModel[] = [];
  skills: skillModel[] = [];

  constructor(private modalService: NgbModal,fb: FormBuilder,private adminService:AdminService) { 
    this.form = fb.group({
      skillToAdd : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.adminService.getSkills().subscribe(result => {
      this.skills = result.skills;
    },
    error=>{
      alert("An error has occurred while retrieving all skills from server");
    
    });
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

  skillModal(skillModalContent):void{
    this.modalService.open( skillModalContent );
  }

}
