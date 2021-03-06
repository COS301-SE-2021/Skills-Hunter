import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { SkillAdvancedSearchComponent } from './skill-advanced-search/skill-advanced-search.component';
import {AdminService } from '../services/admin.service';
import { skillModel } from '../api-message-class/message';

export interface advancedOptions{
  categoryId: string;
  status: number;
};

@Component({
  selector: 'app-skill-control',
  templateUrl: './skill-control.component.html',
  styleUrls: ['./skill-control.component.scss']
})
export class SkillControlComponent implements OnInit {
  data:skillModel[] = [];
  searchTerm:string = "";
  constructor(public dialog: MatDialog,private adminService: AdminService) { }

  ngOnInit(): void {
    document.getElementById('tool').style.display = "block";
    document.getElementById('side').style.display = "block";
    document.getElementById('userlist').style.display = "none"; 
    document.getElementById('house').style.display = "none";
  }


  viewAll(): void{
    this.adminService.getSkills().subscribe(apiValue => {
      this.data = apiValue.skills;
      this.ngOnInit();
    });
  }

  deleteUser(skill: skillModel): void{
    this.adminService.removeSkill(skill.skillId).subscribe(apiValue => {
      
      for(var count = 0; count < this.data.length;count++){
        if(this.data[count].skillId == skill.skillId){
          for(var step = count; step < this.data.length - 1; step++){
            this.data[step] = this.data[step + 1];
          }
          this.data.pop();
          break;
        }
      }

      this.ngOnInit();
    });  
  }

  addSkill():void{ 

  }

  Search(): void{
    if(this.searchTerm != ""){
      let tempData:skillModel[] = this.data;
      let result: skillModel = null;

      this.adminService.getSkills().subscribe(apiValue => {
        tempData = apiValue.skills;
        for(let count  = 0; count < tempData.length; count++){
          if(tempData[count].name == this.searchTerm){
            result = tempData[count];
            break;
          }
        }
  
        if(result != null){
          this.data = [];
          this.data.push(result);
          this.ngOnInit();
        }else{
          this.data = [];
          this.ngOnInit();
        }       
      }); 
      
    }
  }

  advancedSearch(): void {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '40%';
    configDialog.height = '70%';
    configDialog.data = { categoryId: "#",status: -1}

    const dialogRef = this.dialog.open(SkillAdvancedSearchComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {
      let tempData:skillModel[] = [];

      this.adminService.getSkills().subscribe(apiValue => {
        this.data = apiValue.skills;

        for(let count = 0; count < this.data.length; count++){
          if(this.data[count].status == result.status || result.status == -1){
            if(this.data[count].categoryId == result.categoryId ||  result.categoryId == "#"){
              tempData.push(this.data[count]);
            }
          }
        }
  
        this.data = tempData;
        this.ngOnInit();
      });
    });
  }
}
