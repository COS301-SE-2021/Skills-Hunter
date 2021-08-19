import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SliderComponent>) { }

  ngOnInit(): void {
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  confirm(){
    this.dialogRef.close({data:this.value});
  }

  cancel(){
    this.dialogRef.close({data:-1});//-1 to indicate cancellation
  }
}
