// import { Skills } from './../mock-data/mock-skills';
// import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
// import { Skill } from '../classes/Skill';
// import { AddSkillCollectionComponent } from '../createproject/add-skill-collection/add-skill-collection.component';
// import { AddSkillCategoryComponent } from '../createproject/add-skill-category/add-skill-category.component';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public selected?: boolean
  ) {
    if (selected === undefined) selected = false;
  }
}

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss'],
})
export class AddSkillsComponent implements OnInit {
  userControl = new FormControl();

  users = [
    new User('Misha', 'Arnold'),
    new User('Felix', 'Godines'),
    new User('Odessa', 'Thorton'),
    new User('Julianne', 'Gills'),
    new User('Virgil', 'Hommel'),
    new User('Justa', 'Betts'),
    new User('Keely', 'Millington'),
    new User('Blanca', 'Winzer'),
    new User('Alejandrina', 'Pallas'),
    new User('Rosy', 'Tippins'),
    new User('Winona', 'Kerrick'),
    new User('Reynaldo', 'Orchard'),
    new User('Shawn', 'Counce'),
    new User('Shemeka', 'Wittner'),
    new User('Sheila', 'Sak'),
    new User('Zola', 'Rodas'),
    new User('Dena', 'Heilman'),
    new User('Concepcion', 'Pickrell'),
    new User('Marylynn', 'Berthiaume'),
    new User('Howard', 'Lipton'),
    new User('Maxine', 'Amon'),
    new User('Iliana', 'Steck'),
    new User('Laverna', 'Cessna'),
    new User('Brittany', 'Rosch'),
    new User('Esteban', 'Ohlinger'),
    new User('Myron', 'Cotner'),
    new User('Geri', 'Donner'),
    new User('Minna', 'Ryckman'),
    new User('Yi', 'Grieco'),
    new User('Lloyd', 'Sneed'),
    new User('Marquis', 'Willmon'),
    new User('Lupita', 'Mattern'),
    new User('Fernande', 'Shirk'),
    new User('Eloise', 'Mccaffrey'),
    new User('Abram', 'Hatter'),
    new User('Karisa', 'Milera'),
    new User('Bailey', 'Eno'),
    new User('Juliane', 'Sinclair'),
    new User('Giselle', 'Labuda'),
    new User('Chelsie', 'Hy'),
    new User('Catina', 'Wohlers'),
    new User('Edris', 'Liberto'),
    new User('Harry', 'Dossett'),
    new User('Yasmin', 'Bohl'),
    new User('Cheyenne', 'Ostlund'),
    new User('Joannie', 'Greenley'),
    new User('Sherril', 'Colin'),
    new User('Mariann', 'Frasca'),
    new User('Sena', 'Henningsen'),
    new User('Cami', 'Ringo'),
  ];

  selectedUsers: User[] = new Array<User>();

  filteredUsers: Observable<User[]>;
  lastFilter: string = '';

  ngOnInit() {
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith<string | User[]>(''),
      map((value) => (typeof value === 'string' ? value : this.lastFilter)),
      map((filter) => this.filter(filter))
    );
  }

  filter(filter: string): User[] {
    this.lastFilter = filter;
    if (filter) {
      return this.users.filter((option) => {
        return (
          option.firstname.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
          option.lastname.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        );
      });
    } else {
      return this.users.slice();
    }
  }

  displayFn(value: User[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.firstname + ' ' + user.lastname;
        } else {
          displayValue += ', ' + user.firstname + ' ' + user.lastname;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, user: User) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  toggleSelection(user: User) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      const i = this.selectedUsers.findIndex(
        (value) =>
          value.firstname === user.firstname && value.lastname === user.lastname
      );
      this.selectedUsers.splice(i, 1);
    }

    this.userControl.setValue(this.selectedUsers);
  }

  // constructor(public dialogRef: MatDialogRef<AddSkillsComponent>, private _formBuilder: FormBuilder, private _router: Router,private dialog: MatDialog) { }

  // skills: Skill[] = Skills;

  // ngOnInit(): void {
  // // this.skills = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  // // this.skills = Skills;
  // for(var x=0; x<Skills.length; x++){
  //   this.skills.push(Skills[x].SkillName);
  // }
  // }

  // selected(skill){
  //   console.log(skill);
  //   console.log("skill selected");
  //   this.dialogRef.close({data:skill.SkillName});
  // }

  // addNewSkill() {
  //   const configDialog = new MatDialogConfig();
  //   configDialog.backdropClass = 'backGround';
  //   configDialog.width = '50%';
  //   configDialog.height = '50%';
  //   const dialogRef = this.dialog.open(AddSkillCategoryComponent, configDialog);
  // }
}
