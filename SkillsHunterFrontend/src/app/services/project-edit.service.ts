import { Injectable } from '@angular/core';
import { Project } from '../classes/Project';

@Injectable()
export class projectService {
  projectBeingedited: Project;
  constructor() {}
}

//this file is used to pass data from a component to a dialog/pop up
