import { Component, OnInit, Inject } from '@angular/core';
import { mockCategoryData } from '../../mock-data/mock-category';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { skillModel } from 'src/app/api-message-class/message';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit {

  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: skillModel,private adminService:AdminService) { }

  ngOnInit(): void {
  }

  onSave(): void{
    this.adminService.updateSkill(this.data).subscribe(result =>{
      
    });
  }

}
