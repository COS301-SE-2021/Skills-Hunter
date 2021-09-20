import { Component, OnInit } from '@angular/core';
import { getProjectsResponse } from '../../api-message-class/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  searchTerm: string = '';
  filter: boolean = false;
  data: getProjectsResponse[] = [];
  show: getProjectsResponse[] = [];
  open: boolean = false;
  notificationType: number = 0;
  notification: string = 'no message';
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getProjects().subscribe(
      (result) => {
        this.data = result;
        this.setOwners();
        this.show = result;
      },
      (error) => {
        this.notification =
          'An error has occurred while retrieving all users from server';
        this.notificationType = 3;

        setTimeout(function () {
          this.notificationType = 0;
        }, 3000);
      }
    );
  }

  onfilter(): void {
    this.filter = !this.filter;

    if (!this.filter) this.reset();
  }

  reset(): void {
    this.show = this.data;
  }

  match(
    term: string,
    name: string,
    owner: string,
    description: string
  ): boolean {
    if (name.indexOf(term) != -1) return true;

    if (owner.indexOf(term) != -1) return true;

    if (description.indexOf(term) != -1) return true;

    return false;
  }

  search(): void {
    this.show = [];
    if (this.searchTerm != '') {
      for (let count = 0; count < this.data.length; count++) {
        if (
          this.match(
            this.searchTerm.toLowerCase(),
            this.data[count].name.toLowerCase(),
            this.data[count].owner.toLowerCase(),
            this.data[count].description.toLowerCase()
          )
        ) {
          this.show.push(this.data[count]);
          console.log('true');
        }
      }
    }
  }

  filterData(): void {
    this.show = [];
    for (let count = 0; count < this.data.length; count++) {
      if (this.data[count].openForApplication == this.open) {
        this.show.push(this.data[count]);
      }
    }
  }

  setOwners(): void {
    for (let count = 0; count < this.data.length; count++) {
      this.adminService.getUser(this.data[count].owner).subscribe(
        (result) => {
          this.data[count].owner = result.name;
        },
        (error) => {
          this.notification =
            'An error has occurred while retrieving owner of project ' +
            this.data[count].name;
          this.notificationType = 3;

          setTimeout(function () {
            this.notificationType = 0;
          }, 3000);
        }
      );
    }
  }
}
