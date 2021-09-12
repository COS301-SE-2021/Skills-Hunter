import { Component, OnInit,Inject } from '@angular/core';
import { getUserSkillResponse, userSkillModel } from '../../api-message-class/message';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from 'src/app/classes/Admin-Skill';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.scss']
})
export class ShowSkillsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: getUserSkillResponse[]) {
    
  }

  ngOnInit(): void {
  }

}
