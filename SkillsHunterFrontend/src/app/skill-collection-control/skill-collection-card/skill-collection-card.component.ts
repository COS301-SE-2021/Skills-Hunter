import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import { SkillCollection } from 'src/app/classes/SkillCollection';
import { Projects } from 'src/app/mock-data/mock-projects';

@Component({
  selector: 'app-skill-collection-card',
  templateUrl: './skill-collection-card.component.html',
  styleUrls: ['./skill-collection-card.component.scss']
})
export class SkillCollectionCardComponent implements OnInit {
  @Input() collection:SkillCollection;
  @Output() onDeleteCollection: EventEmitter<SkillCollection> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getProject(): string{
    let result:string = "";

    for(let count = 0; count < Projects.length && result == ""; count++){
      if(this.collection.ProjectId == Projects[count].ProjectId){
        result = Projects[count].Name;
      }
    }

    return result;
  }

  onDelete(collection): void{
    this.onDeleteCollection.emit(collection);
  }
}
