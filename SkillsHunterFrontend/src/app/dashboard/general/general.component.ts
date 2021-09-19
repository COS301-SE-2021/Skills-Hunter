import { Component, OnInit } from '@angular/core';
import {
  categoryModel,
  skillModel,
  getProjectsResponse,
  getUserResponse,
} from '../../api-message-class/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  userStats = document.getElementById('user-stats');
  projectStats = document.getElementById('project-stats');
  skillStats = document.getElementById('skill-stats');
  categories: categoryModel[] = [];
  projects: getProjectsResponse[] = [];
  skills: skillModel[] = [];
  users: getUserResponse[] = [];

  userChartData: any = [
    {
      data: [],
    },
  ];

  projectChartData: any = [
    {
      data: [],
    },
  ];

  skillChartData: any = [
    {
      data: [],
    },
  ];

  userChartLabels: any = [];

  projectChartLabels: any = [];

  skillChartLabels: any = [];

  userChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    legend: false,
  };

  userChartColors: any = [];

  projectChartColors: any = [];

  skillChartColors: any = [];

  constructor(private adminService: AdminService) {
    this.loadData();
  }

  ngOnInit(): void {}

  loadData(): void {
    this.adminService.getUsers().subscribe(
      (result) => {
        console.log('LOGGING USERS');
        console.log(result);
        this.users = result;
        this.updateUserchart('role');
      },
      (error) => {
        alert('error loading users');
        console.log(error);
      }
    );

    this.adminService.getSkills().subscribe(
      (result) => {
        this.skills = result.skills;
        this.updateSkillChart();
      },
      (error) => {
        alert('error loading skills');
      }
    );

    this.adminService.getProjects().subscribe(
      (result) => {
        this.projects = result;
        this.updateProjectChart();
      },
      (error) => {
        alert('error loading projects');
      }
    );

    this.adminService.getCategories().subscribe(
      (result) => {
        this.categories = result.category;
      },
      (error) => {
        alert('error loading categories');
      }
    );
  }

  countOpen(value: boolean): number {
    let result: number = 0;

    for (let count = 0; count < this.users.length; count++) {
      if (this.users[count].openForWork == value) result++;
    }

    return result;
  }

  countRole(value: number): number {
    let result: number = 0;
    console.log(this.users);
    for (let count = 0; count < this.users.length; count++) {
      if (this.users[count].userType == value) {
        result++;
      }
    }

    return result;
  }

  countStatus(value: number): number {
    let result: number = 0;
    console.log(this.users);
    for (let count = 0; count < this.users.length; count++) {
      if (this.skills[count].status == value) {
        result++;
      }
    }

    return result;
  }

  countOpenProject(value: boolean): number {
    let result: number = 0;

    for (let count = 0; count < this.users.length; count++) {
      if (this.projects[count].openForApplication == value) result++;
    }

    return result;
  }

  updateProjectChart(): void {
    this.projectChartData = [
      {
        data: [this.countOpen(true), this.countOpen(false)],
      },
    ];

    this.projectChartLabels = ['Yes', 'No'];
    this.projectChartColors = [
      {
        backgroundColor: ['rgba(16, 227, 167, 1)', 'rgba(227, 150, 16, 1)'],
        borderColor: ['rgba(16, 227, 167, .2)', 'rgba(227, 150, 16, .2)'],
      },
    ];
  }

  updateSkillChart(): void {
    this.skillChartData = [
      {
        data: [this.countStatus(0), this.countStatus(1), this.countStatus(2)],
      },
    ];

    this.skillChartLabels = ['Pending', 'Accepted', 'Declined'];

    this.skillChartColors = [
      {
        backgroundColor: [
          'rgba(16, 227, 167, 1)',
          'rgba(227, 150, 16, 1)',
          'rgba(245, 32, 234,1)',
        ],
        borderColor: [
          'rgba(16, 227, 167, .2)',
          'rgba(227, 150, 16, .2)',
          'rgba(245, 32, 234, .2)',
        ],
      },
    ];
  }

  updateUserchart(field): void {
    if (field == 'open') {
      this.userChartData = [
        {
          data: [this.countOpen(true), this.countOpen(false)],
        },
      ];

      this.userChartLabels = ['Yes', 'No'];

      this.userChartColors = [
        {
          backgroundColor: ['rgba(16, 227, 167, 1)', 'rgba(227, 150, 16, 1)'],
          borderColor: ['rgba(16, 227, 167, .2)', 'rgba(227, 150, 16, .2)'],
        },
      ];
    } else if (field == 'role') {
      this.userChartData = [
        {
          data: [
            this.countRole(0),
            this.countRole(1),
            this.countRole(2),
            this.countRole(3),
          ],
        },
      ];

      this.userChartLabels = [
        'Candidate',
        'Project Manager',
        'Organisation',
        'System Administrator',
      ];

      this.userChartColors = [
        {
          backgroundColor: [
            'rgba(16, 227, 167, 1)',
            'rgba(227, 150, 16, 1)',
            'rgba(245, 32, 234,1)',
            'rgba(204, 27, 53,1)',
          ],
          borderColor: [
            'rgba(16, 227, 167, .2)',
            'rgba(227, 150, 16, .2)',
            'rgba(245, 32, 234, .2)',
            'rgba(204, 27, 53,.2)',
          ],
        },
      ];
    }
  }
}
