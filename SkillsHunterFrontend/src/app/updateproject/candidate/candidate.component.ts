import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from './Candidate';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  @Input() candidateObject: Candidate = {id:-1, name:"Candidate Name", job:"Candidate Job", description:"Candidate Description", skills:"Candidate, Skills"};

  constructor() { }

  ngOnInit(): void {
  }

}
