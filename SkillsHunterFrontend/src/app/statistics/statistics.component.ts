import { Component, OnInit } from '@angular/core';
import { UserControlComponent } from '../user-control/user-control.component';
import { User } from '../classes/User';
import { Project } from '../classes/Project';
import { mockUserData, mockProjectData } from './mock-stats';

interface Combo{
  value: string;
  text: string;
}

interface BarValue{
    barValue: string;
    maximum: string;
    numerator: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html', 
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  
  UserTypes: Combo[] = [
    {value: '0', text: 'Candidate'},
    {value: '1', text: 'Project Owner'},
    {value: '2', text: 'Organisation'},
    {value: '3', text: 'Admin'}
  ];

  Status: Combo[] = [
    {value: '0', text: 'Accepted'},
    {value: '1', text: 'Pending'},
    {value: '2', text: 'Declined'}
  ];

  inputUserType: string;
  inputProjectOpen: string;
  inputSkillCategory: string;
  inputSkillStatus: string;
  inputApplicationStatus: string;

  userValues: BarValue;
  projectValues: BarValue;
  skillValues: BarValue;
  applicationValues: BarValue;

  constructor() { }

  ngOnInit(): void { 
      
      this.userValues.barValue = '100';
      this.projectValues.barValue = '100';
      this.skillValues.barValue = '100';
      this.applicationValues.barValue = '100';

      this.userValues.maximum = this.userValues.numerator = mockUserData.length.toString();
      this.projectValues.maximum = this.projectValues.numerator = mockProjectData.length.toString();
      this.skillValues.maximum = this.skillValues.numerator = '100';
      this.applicationValues.maximum = this.applicationValues.numerator = '100';
  }

  onUserfilter(): void{
    let data: User[] = mockUserData;
    let value : number = parseInt(this.inputUserType);
    let match: number = 0;

    for(let count = 0; count < data.length; count++){
        if(data[count].usertype == value)
            match++;
    } 

    match = Math.ceil( match / data.length);

    this.userValues.barValue = match.toString();
    this.userValues.numerator = match.toString();
    this.userValues.maximum = data.length.toString();
  }

  onProjectfilter(): void{
    let data: Project[] = mockProjectData;
    let value: boolean = (this.inputProjectOpen == "true") ? true : false;
    let match: number = 0;

    for(let count = 0; count < data.length; count++){
        if(data[count].openForApplication == value)
            match++;
    }

    match = Math.ceil( match / data.length);

    this.projectValues.barValue = match.toString();
    this.projectValues.numerator = match.toString();
    this.projectValues.maximum = data.length.toString();

  }

  onSkillfilter(): void{

  }

  onApplicationfilter(): void{

  }
}
