import { Skill } from 'src/app/classes/Skill';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Skills } from 'src/app/mock-data/mock-skills';
import { AdminDashboardService } from 'src/app/services/admin-dashboard.service';

@Component({
  selector: 'app-admin-add-skill',
  templateUrl: './admin-add-skill.component.html',
  styleUrls: ['./admin-add-skill.component.scss'],
})
export class AdminAddSkillComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AdminAddSkillComponent>, private adminSkillOperations: AdminDashboardService) {}

  ngOnInit(): void {}

  skillForm: FormGroup = new FormGroup({
    skillName: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    var skillData = new Skill();

    // skillData.SkillId = Skills.length.toString();

    skillData.Name = <string>(
      (<any>this.skillForm.controls['skillName'].value)
    );

    skillData.CategoryId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

    // Skills.push(skillData);

        // the service is called below
        this.adminSkillOperations.adminAddSkill(skillData).subscribe((data) => {
          console.log('Creating a Skill\n', data);
        });

    this.cancel();
  }

  //close dialog popup
  cancel() {
    this.dialogRef.close();
  }
}
