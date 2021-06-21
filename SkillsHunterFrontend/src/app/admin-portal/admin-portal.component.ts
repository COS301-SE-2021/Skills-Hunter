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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AdminAddSkillComponent } from './admin-add-skill/admin-add-skill.component';
import { Router } from '@angular/router';
import { AdminDashboardService } from '../services/admin-dashboard.service';

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
  constructor(private _router: Router, private dialog: MatDialog,private adminSkillOperations: AdminDashboardService) {}

  ngOnInit(): void {}

  columnsToDisplay = ['SkillName'];
  dataSource = Skills;
  expandedElement: Skill | null;
  dataSourceTB = new MatTableDataSource(Skills);

  @ViewChild(MatTable) table: MatTable<Skill>;

  addSkill() {
    const configDialog = new MatDialogConfig();
    configDialog.backdropClass = 'backGround';
    configDialog.width = '43%';
    configDialog.height = '60%';
    this.dialog.open(AdminAddSkillComponent, configDialog);

    // refresh the list of skills:
    this.dataSourceTB = new MatTableDataSource(Skills);
    this.table.renderRows();
  }

  removeSkill(skill: Skill) {
    let Skill_ID =  skill.SkillId;
    for (var index = 0; index < Skills.length; index++) {
      if (
        Skills[index].SkillId.toString().toLowerCase() ===
        Skill_ID.toString().toLowerCase()
      )
        Skills.splice(index, 1);

      this.adminSkillOperations.adminRemoveSkill(skill);
    }

    // refresh the list of skills:
    this.dataSourceTB = new MatTableDataSource(Skills);
    this.table.renderRows();

    // send request to backend:
    this.adminSkillOperations.adminRemoveSkill(skill);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    // refresh the list of skills:
    this.dataSourceTB = new MatTableDataSource(Skills);
    this.dataSourceTB.filter = filterValue.trim().toLowerCase();
  }
}
