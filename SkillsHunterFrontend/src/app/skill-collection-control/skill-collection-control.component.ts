import { Component, OnInit } from '@angular/core';
import { SkillCollection } from '../classes/SkillCollection';
import { mockSkillCollection } from '../mock-data/mock-collection';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { SkillCollectionAdvancedSearchComponent } from './skill-collection-advanced-search/skill-collection-advanced-search.component';
import { AdminService } from '../services/admin.service';
import { getSkillCollectionResponse } from '../api-message-class/message';

@Component({
  selector: 'app-skill-collection-control',
  templateUrl: './skill-collection-control.component.html',
  styleUrls: ['./skill-collection-control.component.scss']
})
export class SkillCollectionControlComponent implements OnInit {
  data:getSkillCollectionResponse[] = [];
  searchTerm:string;

  constructor(public dialog: MatDialog,private adminService: AdminService) { }

  ngOnInit(): void {
    document.getElementById('tool').style.display = "block";
    document.getElementById('side').style.display = "block";
    document.getElementById('userlist').style.display = "none"; 
    document.getElementById('house').style.display = "none";
  }

  viewAll(): void {
    this.adminService.getSkillCollections().subscribe(result=>{
      this.data = result;
      this.ngOnInit();
    })

  }

  advancedSearch(): void {
    // const configDialog = new MatDialogConfig();
    // configDialog.backdropClass = 'backGround';
    // configDialog.width = '30%';
    // configDialog.height = '50%';
    // configDialog.data = "#";

    // const dialogRef = this.dialog.open(SkillCollectionAdvancedSearchComponent,configDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   this.adminService.getSkillCollections().subscribe(response=>{
    //     this.data = response;
    //     let newList: SkillCollection[] = new Array();
        
    //     if(result == undefined || result == "#"){
    //       return;
    //     }
        
    //     for(let count = 0; count < this.data.length; count++){
    //       if(this.data[count].ProjectId == result)
    //         newList.push(this.data[count]);
    //     }
  
    //     this.data = newList;
    //     this.ngOnInit();
    //   })
      

    // });
  } 

  Search(): void{
    if(this.searchTerm != ""){
      this.adminService.getSkillCollections().subscribe(response=>{
        let tempData:getSkillCollectionResponse[] = response;
        let result: getSkillCollectionResponse = null;
        
        for(let count  = 0; count < tempData.length; count++){
          if(tempData[count].Name == this.searchTerm){
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
      })

    }    
  }
  
}
