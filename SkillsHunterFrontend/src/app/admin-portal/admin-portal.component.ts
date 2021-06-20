import { Skills } from './../mock-data/mock-skills';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Skill } from '../classes/Skill';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss'],
})
export class AdminPortalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['name'];
  dataSource = Skills;

  @ViewChild(MatTable) table: MatTable<Skill>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * Skills.length);
    this.dataSource.push(Skills[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}
