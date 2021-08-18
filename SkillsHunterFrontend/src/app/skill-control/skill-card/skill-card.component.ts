import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Skill} from '../../classes/Admin-Skill'
import { mockCategoryData } from '../../mock-data/mock-category';
import { Category } from '../../classes/Category';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { EditSkillComponent } from '../edit-skill/edit-skill.component'; 
import { skillModel } from 'src/app/api-message-class/message';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent implements OnInit {
  @Input() skill:skillModel;
  @Output() onDeleteUser: EventEmitter<skillModel> = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getCategory(id) : string{

    let result:string = "";
    //let categories:Category[] = mockCategoryData;

    // for(let count = 0; count < categories.length; count++){
    //   if(id == categories[count].categoryid){
    //     result = categories[count].name;
    //     break;
    //   }
    // }

    return result;
  }

  onDelete(skill): void{
    this.onDeleteUser.emit(skill);
  }

  onEdit(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '70%';
    configDialog.data = this.skill;

    const dialogRef = this.dialog.open(EditSkillComponent,configDialog);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
