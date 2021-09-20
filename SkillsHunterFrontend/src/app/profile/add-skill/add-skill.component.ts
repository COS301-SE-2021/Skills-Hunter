import { Skills } from 'src/app/mock-data/mock-skills';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { SliderComponent } from './../slider/slider.component';
import { ProjectCRUDService } from './../../services/project-crud.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss'],
})
export class AddSkillComponent implements OnInit {
  array = [
    { SkillId: 'edff4344', Name: 'C++', CategoryID: 'string' },
    { SkillId: 'dffdfgr4', Name: 'Java', CategoryID: 'string' },
    { SkillId: 'zecv4w', Name: 'JS', CategoryID: 'string' },
    { SkillId: 'dee2', Name: 'test', CategoryID: 'string' },
  ]; //This will hold the skills returned from backend
  skillsList = []; //this will list the skills in the UI
  returned;
  array2 = [];
  constructor(
    private service: ProjectCRUDService,
    public dialogRef: MatDialogRef<AddSkillComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('Array Length: ' + this.array.length);
    console.log('Array index 0: ' + this.array[0].Name);

    this.service.getSkills().subscribe((data) => {
      if (data) {
        //status==200)
        console.log(data);
        this.returned = data;
        this.array2 = this.returned.skills;
        console.log(this.array2[0].name);
        //
        for (let i = 0; i < this.array.length; i++) {
          this.skillsList.push(this.array2[i].name);
        }
      } else {
        //alert that couldnt fetch data
      }
    });
  }
  //have a way to distinguish whether and existing skill or new skill is added. one way
  //of doing this is allowing 2 tabs 1 for existing one for new skill and each has its own on click function
  selected(skill) {
    console.log(skill);
    console.log('slill selected');
    //call slider
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '25%';
    configDialog.height = '27%';
    const dialogRef = this.dialog.open(SliderComponent, configDialog);
    // console.log("back");
    dialogRef.afterClosed().subscribe((value) => {
      //console.log("returned: "+skill.data);
      if (value.data != -1) {
        console.log('in add skill: ' + value.data);
        this.dialogRef.close({
          data: {
            rateValue: value.data,
            selectedSkill: skill,
          },
        });
        //return the skill and the value to profile then send request to backend
      } else {
        console.log('returned empty:');
      } //dialog closed
    });
  }
  // this.dialogRef.close({data:skill});
}

/*onSubmit() {
  var formData = new Login();

  formData.Email = this.LoginForm.get('email').value;
  formData.Password = this.LoginForm.get('password').value;

  this.loginService.login(formData)
  .subscribe(
    data=>{
      
      if(data.status==200)
      {
        this._match=true;
        localStorage.setItem('role', data.body.role);
        localStorage.setItem('token',data.body.token);
        localStorage.setItem('name',data.body.name);
        localStorage.setItem('surname',data.body.surname);
        this._router.navigate([`home`]);
      }
      else
      {
        this._match=false;
      }
    },
    err =>{
     
      if(err.status>=400 && err.status<500){
        this._match=false;
      }
     else
     {
       console.log('HTTP Error1', err);//server error
     }
    }
  );
}*/
