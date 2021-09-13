import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.scss']
})
export class StatsBarComponent implements OnInit {
  @Input() barValue: string;
  @Input() maximum: string;
  @Input() numerator: string;
  constructor() { }

  ngOnInit(): void {
  }

}
