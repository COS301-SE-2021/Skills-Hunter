import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from 'src/app/classes/Candidate';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
  @Input() card_candidate: Candidate;

  constructor() {}

  ngOnInit(): void {}
}