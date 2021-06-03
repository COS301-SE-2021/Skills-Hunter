import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from './Candidate';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  @Input() candidateObject: Candidate = {id:-1, name:"Hello World", job:"Painter", description:"Describe the candidate", skills:[""]};

  constructor() { }

  ngOnInit(): void {
  }

}
