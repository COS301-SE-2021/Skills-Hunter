import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { matchingCandidate } from '../classes/project';
import { InviteComponent } from '../invite/invite.component';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-match-candidates',
  templateUrl: './match-candidates.component.html',
  styleUrls: ['./match-candidates.component.scss']
})
export class MatchCandidatesComponent implements OnInit {

  animal: string;
  name: string;
  candidates: matchingCandidate[];
  projectId: string;


  constructor(public dialog: MatDialog, private projectService: ProjectService, private _router: Router, private activeRoute: ActivatedRoute) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '50%',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe( params => {
      this.projectId = params['projectId'];
      this.projectService.matchCandidates(this.projectId)
      .subscribe(
        data=>{ 
          this.candidates = data;
          console.log(this.candidates);
        },
        err =>{
        
          if(err.status>=400 && err.status<500){
            console.log(err.status);
          }
        else
        {
          console.log('HTTP Error1', err);//server error
        }
        }
      );
    });
  }
}
