import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-collection',
  templateUrl: './skill-collection.component.html',
  styleUrls: ['./skill-collection.component.scss']
})
export class SkillCollectionComponent implements OnInit {
  searchTerm: string = "";
  notification: string = "";
  notificationType: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  search(): void{
    
  }
}
