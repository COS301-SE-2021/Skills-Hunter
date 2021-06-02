import { Component, OnInit,Input } from '@angular/core';
import { project} from '../../classes/Project';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  panelOpenState :boolean = false;
  @Input() _project:project = {projectName:'',description:'',industry:'',skill:'',openForApllication:false};

  constructor() { }

  ngOnInit(): void {
  }

}
