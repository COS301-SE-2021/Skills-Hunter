import { Skill } from 'src/app/classes/Skill';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Skills } from 'src/app/mock-data/mock-skills';

@Component({
  selector: 'app-admin-add-skill',
  templateUrl: './admin-add-skill.component.html',
  styleUrls: ['./admin-add-skill.component.scss'],
})
export class AdminAddSkillComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AdminAddSkillComponent>) {}

  ngOnInit(): void {}

  skillForm: FormGroup = new FormGroup({
    skillName: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    var skillData = new Skill();

    skillData.SkillId = Skills.length.toString();

    skillData.SkillName = <string>(
      (<any>this.skillForm.controls['skillName'].value)
    );

    skillData.SkillWeight = 0;

    Skills.push(skillData);
  }

  //close dialog popup
  cancel() {
    this.dialogRef.close();
  }
}
