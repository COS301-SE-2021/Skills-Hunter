import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getProjectSkillResponse, getProjectSkillsResponse } from '../../api-message-class/message';

@Component({
  selector: 'app-show-project-skill',
  templateUrl: './show-project-skill.component.html',
  styleUrls: ['./show-project-skill.component.scss']
})
export class ShowProjectSkillComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: getProjectSkillsResponse[]) { }

  ngOnInit(): void {
  }

}
