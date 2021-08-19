import { Component, OnInit,Inject } from '@angular/core';
import { userSkillModel } from '../../api-message-class/message';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.scss']
})
export class ShowSkillsComponent implements OnInit {
  projectSkillsData:userSkillModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,private adminService: AdminService) {
    this.adminService.getUserSkills(data).subscribe( result => {
      this.projectSkillsData = result;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
  }

}
