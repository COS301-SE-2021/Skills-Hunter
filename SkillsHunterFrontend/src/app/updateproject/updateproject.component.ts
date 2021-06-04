import { CandidatesList } from './candidate/mock-candidates';
import { Candidate } from './candidate/Candidate';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})

export class UpdateprojectComponent implements OnInit {
  title :string = 'Candidate';
  candidatesList:Candidate[] = CandidatesList;

  constructor() { }

  ngOnInit(): void {
  }

}
