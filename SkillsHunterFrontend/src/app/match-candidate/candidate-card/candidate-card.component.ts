import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { Candidate } from './Candidate';

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
