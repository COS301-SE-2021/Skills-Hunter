import { Component, OnInit } from '@angular/core';
import { SkillCollection } from '../classes/SkillCollection';
import { mockSkillCollection } from '../mock-data/mock-collection';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { SkillCollectionAdvancedSearchComponent } from './skill-collection-advanced-search/skill-collection-advanced-search.component';

@Component({
  selector: 'app-skill-collection-control',
  templateUrl: './skill-collection-control.component.html',
  styleUrls: ['./skill-collection-control.component.scss']
})
export class SkillCollectionControlComponent implements OnInit {
  data:SkillCollection[] = [];
  searchTerm:string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  viewAll(): void {
    this.data = mockSkillCollection;
    this.ngOnInit();
  }

  deleteCollection(collection): void{
    for(var count = 0; count < this.data.length;count++){
      if(this.data[count].ProjectSkillCollectionId == collection.ProjectSkillCollectionId){
        for(var step = count; step < this.data.length - 1; step++){
          this.data[step] = this.data[step + 1];
        }
        this.data.pop();
        break;
      }
    }

    this.ngOnInit();    
  }

  advancedSearch(): void {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '30%';
    configDialog.height = '50%';
    configDialog.data = "#";

    const dialogRef = this.dialog.open(SkillCollectionAdvancedSearchComponent,configDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.data = mockSkillCollection;
      let newList: SkillCollection[] = new Array();
      
      if(result == undefined || result == "#"){
        return;
      }
      
      for(let count = 0; count < this.data.length; count++){
        if(this.data[count].ProjectId == result)
          newList.push(this.data[count]);
      }

      this.data = newList;
      this.ngOnInit();
    });
  }

  Search(): void{
    if(this.searchTerm != ""){
      let tempData:SkillCollection[] = mockSkillCollection;
      let result: SkillCollection = null;
      
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
    }    
  }
  
}