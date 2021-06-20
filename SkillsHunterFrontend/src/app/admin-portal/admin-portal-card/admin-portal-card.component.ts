import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/classes/Skill';

@Component({
  selector: 'app-admin-portal-card',
  templateUrl: './admin-portal-card.component.html',
  styleUrls: ['./admin-portal-card.component.scss'],
})
export class AdminPortalCardComponent implements OnInit {
  @Input() card_skill: Skill;

  constructor() {}

  ngOnInit(): void {}
}
