import { Component, OnInit } from '@angular/core';
import { ProjectCRUDService } from '../services/project-crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match-candidate',
  templateUrl: './match-candidate.component.html',
  styleUrls: ['./match-candidate.component.scss'],
})
export class MatchCandidateComponent implements OnInit {
  title: string = 'Candidate';
  candidatesList = [];

  constructor(
    private projectCrud: ProjectCRUDService,
    private route: ActivatedRoute,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => console.log(params));

    // var projectAsReceived = this.route.paramMap.subscribe((params) => {
    // Defaults to 0 if no query param provided.
    // proj  = +params['projectData'];
    //   console.log('\nProject as Received\n');
    //   console.log(params['data']);
    // });

    // this.projectCrud
    //   .obtainMatchingCandidates('a0b67c06-3ef7-4dc3-9891-08d978769a8')
    //   .subscribe((data) => {
    //     this.candidatesList = data;
    //     console.log('Response post', data);
    //   });
  }
}
