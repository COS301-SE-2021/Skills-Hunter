import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { inviteCandidateRequest, matchingCandidate } from '../classes/project';
import { InviteComponent } from '../invite/invite.component';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-match-candidates',
  templateUrl: './match-candidates.component.html',
  styleUrls: ['./match-candidates.component.scss']
})
export class MatchCandidatesComponent implements OnInit {

  message: string;
  candidates: matchingCandidate[];
  projectId: string;
  userId: string;


  constructor(public dialog: MatDialog, private projectService: ProjectService, private _router: Router, private activeRoute: ActivatedRoute) {}
  openDialog(user): void {
    this.userId = user;
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '50%',
      data: {message: this.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.message = result;
        //console.log(this.userId);
        //console.log(this.message);

        //request: inviteCandidateRequest;
        let request = new  inviteCandidateRequest();
        request.inviteeId = this.userId;
        request.message = result;
        request.projectId = this.projectId;
        request.UserId = localStorage.getItem('userId');
        //console.log(request);

        this.projectService.inviteCandidate(request)
        .subscribe(
          data=>{ 
            //console.log(data);
            this._router.navigate(['matchCandidates', this.projectId]);
              
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
      }
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
