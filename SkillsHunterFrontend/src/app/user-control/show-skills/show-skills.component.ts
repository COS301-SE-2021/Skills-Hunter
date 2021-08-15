import { Component, OnInit,Inject } from '@angular/core';
import { Skill } from 'src/app/classes/Skill';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.scss']
})
export class ShowSkillsComponent implements OnInit {
  projectSkillsData:Skill[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    
  }

  ngOnInit(): void {
  }

}
