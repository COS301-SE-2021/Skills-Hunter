import { Component, OnInit } from '@angular/core';
import { UserControlComponent } from '../user-control/user-control.component';
import { mockUserData } from '../mock-data/mock-users';
import { User } from '../classes/User';

interface Combo{
  value: string;
  text: string;
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

  Categories: Combo[] = [
    {value: '0', text: 'Game Engine Development'},
    {value: '1', text: 'Machine Learning'},
    {value: '2', text: 'Web development'}
  ]

  Status: Combo[] = [
    {value: '0', text: 'Accepted'},
    {value: '1', text: 'Pending'},
    {value: '2', text: 'Declined'}
  ]

  userData: User[];

  constructor() {}

  ngOnInit(): void {
    this.userData = mockUserData;
 
  }

}
