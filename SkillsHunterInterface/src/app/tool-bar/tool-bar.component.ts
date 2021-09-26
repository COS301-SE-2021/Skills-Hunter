import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  @Input() inputDrawer: any;
  constructor() { }

  ngOnInit(): void {
  }

  toogleSideNav(): void{
    var sideNav=document.getElementById("Side-nav")?.toggleAttribute;
  }

}
