import { Project } from '../classes/Project';

export const Projects: Project[] = [
  {
    ProjectId: '0',
    Name: 'Skills Hunter',
    Description:
      'By using the latest innovations in AI and mobile platforms, we want to solve the problem of matching appropriate IT skills to available projects by creating an application that matches IT skills with appropriate IT projects',
    Owner: 'XYC Devs',
    Location: 'Hatfield',
    Skill: ['Angular', 'DotNet Core'],
    OpenForApplication: false,
  },
  {
    ProjectId: '1',
    Name: 'Smart Student Handbook',
    Description:
      'The smart student notebook consists out of an organizational mechanism to organize notes (Degree, Module, Year etc.). Notes are written in markup. Each note is accompanied by smart assist. Smart assist is a toolbar/widget on the side of the notes where it recommends content for the notes based on the content already written and shared to the community.',
    Owner: 'DCB Devs',
    Location: 'Durban',
    Skill: ['Docker', 'React', 'Vue', 'DotNet Core'],
    OpenForApplication: true,
  },
  {
    ProjectId: '2',
    Name: 'Augmented Reality Education System',
    Description:
      'EduGo will make use of Augmented Reality (AR) to present information to learners in a way that is interactive and fun. As an example, learners could leave the classroom and explore a sports field to find and learn about dinosaurs. These dinosaurs would appear on the learners’ mobile devices when they are in the vicinity. In another class, students may walk up to a table to see 3D models of multiple organs in the human body. Selecting an organ will reveal more information about it.',
    Owner: 'ABC Devs',
    Location: 'Cape Town',
    Skill: ['Docker', 'React', 'Vue', 'DotNet Core'],
    OpenForApplication: true,
  },
  {
    ProjectId: '3',
    Name: 'GeoCode – Virtual Global Treasure Hunt ',
    Description:
      'The GeoCode project is inspired by the popular Geocaching app. Instead of using physical geocaches, QR codes (called geocodes) will be hidden and can be scanned by participants to view the contents of the discovered geocode. The project will consist of creating a mobile application that will allow users to track, scan, and virtually view geocodes. The platform will also include features such as leaderboards, virtual collectable and trackable objects, as well as time trials including a sequence of geocodes that can be discovered.',
    Owner: 'TYS Devs',
    Location: 'Limpopo',
    Skill: ['Docker', 'Vue', '.Net Core'],
    OpenForApplication: true,
  },
];
