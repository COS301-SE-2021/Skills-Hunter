import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { categoryModel,skillModel } from '../../api-message-class/message';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  filter:boolean = false;
  create:boolean = false;
  searchTerm: string = "";
  data: skillModel[] = [];
  category: categoryModel[] = [];
  show: skillModel[] = [];
  notificationType: number = 0;
  notification: string = "no message";
  status: number = -1;
  name: string = "";
  cat: string = "";

  constructor(private modalService: NgbModal,private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getSkills().subscribe(apiValue => {
      this.data = apiValue.skills;
      this.show = this.data;
    },
    error=>{
      this.notification = "An error has occurred while retrieving all skills from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    });

    this.adminService.getCategories().subscribe(apiValue => {
      this.category = apiValue.category;
    },
    error=>{
      this.notification = "An error has occurred while retrieving all categories from server";
      this.notificationType = 3;
      
      setTimeout(function(){
        this.notificationType = 0;
      }, 3000);
    
    });
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  onfilter(): void{
    this.filter = !this.filter;

    if(!this.filter)
      this.reset();
  }

  reset(): void{
    this.show = this.data;
  }

  filterData(): void{
    this.show = [];
    for(let count = 0; count < this.data.length; count++){
        if(this.status != -1){
          if(this.status == this.data[count].status)
            this.show.push(this.data[count]);
        }   
    }
  }

  createSkill(): void{

  }

  search(): void{

  }

}
