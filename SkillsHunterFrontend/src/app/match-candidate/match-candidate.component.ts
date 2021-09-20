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
  projectId: any;

  constructor(
    private route: ActivatedRoute,
    private projectCrud: ProjectCRUDService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('PARAMS IS');
      console.log(params);

      this.candidatesList = theCandidate;
      this.projectId = params.projectId;
    });

    // this.projectCrud
    //   .obtainMatchingCandidates(this.projectId)
    //   .subscribe((data) => {
    //     console.log('ID DATA');
    //     console.log(data);
    //     this.candidatesList = data;
    //     console.log('Response post', data);
    //   });
  }
}

var theCandidate = [
  {
    percentage: 30,
    userId: '6129e1fb-9407-4f58-97da-08d97c0a93a8',
    name: 'Percy',
    surname: 'Candidate',
    email: 'candidate3@gmail.com',
    matchingSkills: [
      {
        skillId: 'f663113c-e1d2-413b-1cd4-08d97c0bf9f1',
        name: 'MySQL',
        weight: 9,
        percentage: 100,
        yearsOfExperience: 0,
      },
      {
        skillId: 'f1e92157-9a5b-4957-1cd3-08d97c0bf9f1',
        name: 'Python',
        weight: 3,
        percentage: 50,
        yearsOfExperience: 0,
      },
    ],
  },
  {
    percentage: 20,
    userId: 'd2ae4329-4455-45b5-97d8-08d97c0a93a8',
    name: 'Sally',
    surname: 'Candidate',
    email: 'candidate1@gmail.com',
    matchingSkills: [
      {
        skillId: 'f1e92157-9a5b-4957-1cd3-08d97c0bf9f1',
        name: 'Python',
        weight: 6,
        percentage: 100,
        yearsOfExperience: 0,
      },
    ],
  },
  {
    percentage: 10,
    userId: '587ba00c-5a49-40f6-97d9-08d97c0a93a8',
    name: 'Sipho',
    surname: 'Candidate',
    email: 'candidate2@gmail.com',
    matchingSkills: [
      {
        skillId: 'ddb3ea70-8ad6-43b7-1cd2-08d97c0bf9f1',
        name: 'Flutter',
        weight: 3,
        percentage: 50,
        yearsOfExperience: 0,
      },
    ],
  },
];
