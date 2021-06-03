import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '../candidate/Candidate';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.scss']
})
export class CandidateItemComponent implements OnInit {
  @Input() _candidate: Candidate = {id:-1, name:"", description:"", skills:[""]};
  constructor() { }

  ngOnInit(): void {
  }

}
