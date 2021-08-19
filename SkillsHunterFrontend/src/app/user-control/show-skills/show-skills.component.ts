import { Component, OnInit,Inject } from '@angular/core';
import { userSkillModel } from '../../api-message-class/message';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { mockUserSkills } from 'src/app/mock-data/mock-user-skills';
import { Skill } from 'src/app/classes/Admin-Skill';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.scss']
})
export class ShowSkillsComponent implements OnInit {
  projectSkillsData:userSkillModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,private adminService: AdminService) {
    this.adminService.getUserSkills(data).subscribe( result => {
      for(let count = 0; count < result.length; count++){
        if(result[count].userId == data)
          this.projectSkillsData.push(result[count]);
      }

      this.ngOnInit();
      this.setName();
    },
    error=>{
      for(let count = 0; count < mockUserSkills.length; count++){
        if(mockUserSkills[count].userId == data)
          this.projectSkillsData.push(mockUserSkills[count]);
      }

      this.ngOnInit();
      this.setName();
    });
  }

  ngOnInit(): void {
  }

  
  setName(): void{
    this.adminService.getSkills().subscribe(result=>{
      let found:boolean = false;

      for(let step = 0; step < this.projectSkillsData.length; step++){
        found = false;
        for(let count = 0; count < result.skills.length && !found; count++){
          if(result.skills[count].skillId == this.projectSkillsData[step].skillId){
              document.getElementById(this.projectSkillsData[step].skillId).innerHTML = result.skills[count].name;
              found = true;
            }

        }

        if(!found){
          document.getElementById(this.projectSkillsData[step].skillId).innerHTML = "no name found";
        }
      }

      this.ngOnInit();
    },
    error=>{
      let data:Skill[];
      let found:boolean = false;

      for(let step = 0; step < this.projectSkillsData.length; step++){
        found = false;
        for(let count = 0; count < data.length && !found; count++){
          if(data[count].skillid == this.projectSkillsData[step].skillId){
              document.getElementById(this.projectSkillsData[step].skillId).innerHTML = data[count].name;
              found = true;
            }
        }

        if(!found){
          document.getElementById(this.projectSkillsData[step].skillId).innerHTML = "no name found";
        }
      }

      this.ngOnInit();
    })
  }

}
