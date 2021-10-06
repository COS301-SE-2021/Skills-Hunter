import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { skill } from 'src/app/classes/admin';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { EditSkillComponent } from '../edit-skill/edit-skill.component'; 


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() skill:skill;
  @Output() onDeleteUser: EventEmitter<skill> = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getCategory(id) : string{

    let result:string = "";

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
