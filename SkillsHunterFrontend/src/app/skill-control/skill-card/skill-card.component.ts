import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Skill} from '../../classes/Admin-Skill'
import { mockCategoryData } from '../../mock-data/mock-category';
import { Category } from '../../classes/Category';
@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent implements OnInit {
  @Input() skill:Skill;
  @Output() onDeleteUser: EventEmitter<Skill> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getCategory(id) : string{
    console.log(id);
    let result:string;
    let categories:Category[] = mockCategoryData;

    for(let count = 0; count < categories.length; count++){
      if(id == categories[count].categoryid){
        result = categories[count].name;
        break;
      }
    }

    return result;
  }

  onDelete(skill): void{
    this.onDeleteUser.emit(skill);
  }
}
