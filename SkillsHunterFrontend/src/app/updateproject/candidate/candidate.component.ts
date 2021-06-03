import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from './Candidate';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  @Input() _candidate: Candidate = {id:-1, name:"", job:"", description:"", skills:[""]};
  
  constructor() { }

  ngOnInit(): void {
  }

}
