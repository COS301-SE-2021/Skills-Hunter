import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SliderComponent } from './../slider/slider.component';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
 array=[{"SkillId" : "edff4344",
         "Name" : "C++",
         "CategoryID" : "string"},
         {"SkillId" : "dffdfgr4",
         "Name" : "Java",
         "CategoryID" : "string"},
         {"SkillId" : "zecv4w",
         "Name" : "JS",
         "CategoryID" : "string"},
         {"SkillId" : "dee2",
         "Name" : "test",
         "CategoryID" : "string"}];//This will hold the skills returned from backend
  skillsList=[];//this will list the skills in the UI

  constructor(public dialogRef: MatDialogRef<AddSkillComponent>,private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("Array Length: "+this.array.length);
    console.log("Array index 0: "+this.array[0].Name);
    
    for(let i=0;i<this.array.length;i++){
      this.skillsList.push(this.array[i].Name);
    }

  }
//have a way to distinguish whether and existing skill or new skill is added. one way
//of doing this is allowing 2 tabs 1 for existing one for new skill and each has its own on click function
  selected(skill){
    console.log(skill);
    console.log("slill selected");
    //call slider 
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '25%';
    configDialog.height = '27%';
    const dialogRef = this.dialog.open(SliderComponent, configDialog);
   // console.log("back");
    dialogRef.afterClosed().subscribe(value => {
     
      //console.log("returned: "+skill.data);
      if(value.data !=-1)
      {
       console.log("in add skill: "+value.data);
        this.dialogRef.close({data:{
                              rateValue:value.data,
                              selectedSkill:skill
                            }});
      //return the skill and the value to profile then send request to backend
      }
      else{ 
        console.log("returned empty:");
      }//dialog closed
    });
  }
   // this.dialogRef.close({data:skill});
 }

