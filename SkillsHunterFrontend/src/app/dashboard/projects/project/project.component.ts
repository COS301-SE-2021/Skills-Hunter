import { Component, OnInit,Input } from '@angular/core';
import { getProjectsResponse } from '../../../api-message-class/message';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project:getProjectsResponse;
  Owner:string = "";
  ownerSet: boolean = false;

  constructor(private adminService: AdminService) {
    
  }

  ngOnInit(): void {
    if(!this.ownerSet)
      this.setOwner();
  }

  setOwner(): void{
      this.adminService.getUser(this.project.owner).subscribe(
        (result) => {
          this.Owner = result.email;
          this.ownerSet = true;
        },
        (error) => {

        }
      );    
  }

}
