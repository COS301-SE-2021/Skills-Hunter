import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  filter:boolean = false;
  create:boolean = false;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

    openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

}
