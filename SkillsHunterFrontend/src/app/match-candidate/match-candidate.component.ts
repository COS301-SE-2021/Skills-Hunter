import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '../classes/Candidate';
import { CandidatesList } from './candidate-card/mock-candidates';

@Component({
  selector: 'app-match-candidate',
  templateUrl: './match-candidate.component.html',
  styleUrls: ['./match-candidate.component.scss'],
})
export class MatchCandidateComponent implements OnInit {
  title: string = 'Candidate';
  candidatesList: Candidate[] = CandidatesList;
  filterQuery: string = '';

  constructor() {}

  ngOnInit(): void {}
}
