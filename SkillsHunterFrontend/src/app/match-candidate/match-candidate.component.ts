import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '../classes/Candidate';
import { CandidatesList } from '../mock-data/mock-candidates';
import { ProjectCRUDService } from '../services/project-crud.service';

@Component({
  selector: 'app-match-candidate',
  templateUrl: './match-candidate.component.html',
  styleUrls: ['./match-candidate.component.scss'],
})
export class MatchCandidateComponent implements OnInit {
  title: string = 'Candidate';
  candidatesList = [];
  filterQuery: string = '';

  constructor(private projectCrud: ProjectCRUDService) {}

  ngOnInit(): void {
    this.projectCrud
      .obtainMatchingCandidates('a0b67c06-3ef7-4dc3-9891-08d978769a8')
      .subscribe((data) => {
        this.candidatesList = data;
        console.log('Response post', data);
      });
  }
}
