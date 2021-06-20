import { Skills } from './../mock-data/mock-skills';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Skill } from '../classes/Skill';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminPortalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  columnsToDisplay = ['name'];
  dataSource = Skills;
  expandedElement: Skill | null;
  dataSourceTB = new MatTableDataSource(Skills);

  @ViewChild(MatTable) table: MatTable<Skill>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * Skills.length);
    this.dataSource.push(Skills[randomElementIndex]);
    // refresh the list of skills:
    this.dataSourceTB = new MatTableDataSource(Skills);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    // refresh the list of skills:
    this.dataSourceTB = new MatTableDataSource(Skills);
    this.table.renderRows();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // refresh the list of skills:
    this.dataSourceTB = new MatTableDataSource(Skills);
    this.dataSourceTB.filter = filterValue.trim().toLowerCase();
  }
}
