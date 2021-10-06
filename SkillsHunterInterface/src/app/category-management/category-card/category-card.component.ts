import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/classes/admin';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  @Input() category:Category;
  @Output() onDeleteCategory: EventEmitter<Category> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onDelete(category): void{
    this.onDeleteCategory.emit(category);
  }

}
