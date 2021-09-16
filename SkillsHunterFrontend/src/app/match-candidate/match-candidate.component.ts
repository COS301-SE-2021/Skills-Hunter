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
    this.route.params.subscribe((params) => {
      // Extract the Project ID:
      var projectID = params.projectId;

      console.log('About to Log the Project ID');
      console.log(projectID);

      this.projectCrud.obtainMatchingCandidates(projectID).subscribe((data) => {
        this.candidatesList = data;
        console.log('Response post', data);
      });
    });
  }
}
