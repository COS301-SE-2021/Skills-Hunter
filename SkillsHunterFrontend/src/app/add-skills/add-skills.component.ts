import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {

 skills: string[];
  constructor(public dialogRef: MatDialogRef<AddSkillsComponent>) { }

  ngOnInit(): void {
    this.skills = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  }

  selected(skill){
    console.log(skill);
    console.log("slill selected");
    this.dialogRef.close({data:skill});
  }
}
