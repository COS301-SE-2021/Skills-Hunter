import { Skills } from './../mock-data/mock-skills';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddSkillsComponent>) { }

  skills: string[];
  // Skills.forEach(function(skillItem){
  //   this.skills.push(skillItem.SkillName);
  // });


  ngOnInit(): void {
    // this.skills = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    // this.skills = Skills;
    for(var x=0; x<Skills.length; x++){
      this.skills.push(Skills[x].SkillName);
    }
  }

  selected(skill){
    console.log(skill);
    console.log("skill selected");
    this.dialogRef.close({data:skill});
  }
}
