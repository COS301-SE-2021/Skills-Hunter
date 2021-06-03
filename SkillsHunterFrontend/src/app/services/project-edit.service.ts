import { Injectable } from '@angular/core';
import {project} from '../classes/project';

@Injectable()
export class projectService
{
    projectBeingedited: project;
    constructor(){}
}

//this file is used to pass data from a component to a dialog/pop up