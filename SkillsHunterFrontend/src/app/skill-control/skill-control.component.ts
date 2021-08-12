import { Component, OnInit } from '@angular/core';
import { adminSkillsData } from '../mock-data/mock-admin-skills';
import { Skill } from '../classes/Admin-Skill';

@Component({
  selector: 'app-skill-control',
  templateUrl: './skill-control.component.html',
  styleUrls: ['./skill-control.component.scss']
})
export class SkillControlComponent implements OnInit {
  data:Skill[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  viewAll(): void{
    console.log("view All");
    this.data = adminSkillsData;
    this.ngOnInit();
  }

  deleteUser(skill): void{
    for(var count = 0; count < this.data.length;count++){
      if(this.data[count].skillid == skill.skillid){
        for(var step = count; step < this.data.length - 1; step++){
          this.data[step] = this.data[step + 1];
        }
        this.data.pop();
        break;
      }
    }

    this.ngOnInit();
  }

}
