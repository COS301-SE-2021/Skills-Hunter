import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  candidatesList = theCandidate;
}

const theCandidate = [
  {
    percentage: 50,
    userId: 'b3d3e53a-f875-441f-d757-08d9786a3e36',
    name: 'Candidate',
    surname: 'One',
    email: 'candidate1@gmail.com',
    matchingSkills: [
      {
        skillId: '0267ff11-f774-4d9b-643c-08d9787120f0',
        name: 'C++',
        weight: 5,
        percentage: 40,
        yearsOfExperience: 1,
      },
      {
        skillId: '0267ff11-f774-4d9b-643c-08d9787120f0',
        name: 'C++',
        weight: 5,
        percentage: 40,
        yearsOfExperience: 1,
      },
    ],
  },
  {
    percentage: 80,
    userId: 'b3e9e7eb-e355-4f24-d758-08d9786a3e36',
    name: 'Candidate',
    surname: 'Two',
    email: 'candidate2@gmail.com',
    matchingSkills: [
      {
        skillId: '0267ff11-f774-4d9b-643c-08d9787120f0',
        name: 'C++',
        weight: 8,
        percentage: 40,
        yearsOfExperience: 1,
      },
    ],
  },
  {
    percentage: 70,
    userId: '742ab9db-35ec-4f92-d759-08d9786a3e36',
    name: 'Candidate',
    surname: 'Three',
    email: 'candidate3@gmail.com',
    matchingSkills: [
      {
        skillId: 'ebe1738e-c37b-4808-643d-08d9787120f0',
        name: 'Java',
        weight: 7,
        percentage: 45,
        yearsOfExperience: 1,
      },
    ],
  },
];
