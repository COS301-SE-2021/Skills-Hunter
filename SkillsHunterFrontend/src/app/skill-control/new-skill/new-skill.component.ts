import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { categoryModel, getCategoryByIdRequest } from 'src/app/api-message-class/message';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.scss']
})
export class NewSkillComponent implements OnInit {
  name: string;
  category: FormControl = new FormControl();
  categories: categoryModel[];
  constructor(private adminService:AdminService) { 
    this.loadCategories();
  }

  ngOnInit(): void {
    
  }

  loadCategories() : void{
    this.adminService.getCategories().subscribe(apiValue => {
      this.categories = apiValue.category;
      this.ngOnInit();
    });
  }

  onSave(): void{
    let selectedCategories: string[] = this.category.value;
    let temp: getCategoryByIdRequest[] = new Array();
    let tmp: getCategoryByIdRequest = {
      CategoryId : ""
    };

    for( let count = 0; count < selectedCategories.length; count++){
      tmp.CategoryId = selectedCategories[count];
      temp.push(tmp);
    }

    this.adminService.createSkill(this.name,temp).subscribe(result => {

    })
  }

}
