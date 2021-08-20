import { Component, OnInit, Input } from '@angular/core';
import { getProjectsResponse } from 'src/app/api-message-class/message';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { ShowProjectSkillComponent } from '../show-project-skill/show-project-skill.component';
@Component({
  selector: 'app-admin-project-card',
  templateUrl: './admin-project-card.component.html',
  styleUrls: ['./admin-project-card.component.scss']
})
export class AdminProjectCardComponent implements OnInit {
  @Input() project:getProjectsResponse;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showSkills(): void{
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '35%';
    configDialog.height = '70%';
    configDialog.data = this.project.projectSkills.skills;

    const dialogRef = this.dialog.open(ShowProjectSkillComponent,configDialog);  
  }

}
