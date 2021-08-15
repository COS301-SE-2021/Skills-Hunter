import { User } from '../classes/User';
import { Project } from '../classes/Project';

export const mockUserData: User[] = [
  {
      id: "0",
      name: "Ronald",
      surname: "Jones",
      email: "rj@gmail.com",
      phone: "0724918832",
      startdate: "13-08-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "1",
      name: "Mark",
      surname: "Smith",
      email: "m.smith@gmail.com",
      phone: "0624918732",
      startdate: "10-08-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "2",
      name: "Sam",
      surname: "Kane",
      email: "sam.kane@gmail.com",
      phone: "0714316842",
      startdate: "16-08-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "3",
      name: "Judith",
      surname: "Polgar",
      email: "jud.polgar@gmail.com",
      phone: "0724918832",
      startdate: "13-08-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "4",
      name: "Wesley",
      surname: "So",
      email: "so@gmail.com",
      phone: "0626914822",
      startdate: "07-08-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "5",
      name: "Magnus",
      surname: "Carlsen",
      email: "m.carlsen@gmail.com",
      phone: "0124938323",
      startdate: "12-06-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "6",
      name: "Fabiano",
      surname: "Caruana",
      email: "Caruana00@gmail.com",
      phone: "0784914831",
      startdate: "11-07-2021",
      openforwork: true,
      usertype: 1
  },
  {
      id: "7",
      name: "Alireza",
      surname: "Firouzja",
      email: "Alireza.f012@gmail.com",
      phone: "0736918831",
      startdate: "12-08-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "8",
      name: "Jan Krystof",
      surname: "Duda",
      email: "JKD@yahoo.com",
      phone: "0724975834",
      startdate: "13-04-2021",
      openforwork: true,
      usertype: 0
  },    {
      id: "9",
      name: "Lilly",
      surname: "Allen",
      email: "L.Allen@gmail.com",
      phone: "0724213842",
      startdate: "13-09-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "10",
      name: "Bobby fischer",
      surname: "Jones",
      email: "B.fischer00@gmail.com",
      phone: "0724712831",
      startdate: "13-06-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "11",
      name: "Paul",
      surname: "Morphy",
      email: "Charles.Morphy@gmail.com",
      phone: "0154918532",
      startdate: "13-08-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "12",
      name: "Adolf",
      surname: "Andersson",
      email: "Andersson@gmail.com",
      phone: "0724218330",
      startdate: "13-05-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "13",
      name: "Mikhail",
      surname: "Tal",
      email: "Misha@gmail.com",
      phone: "0726918312",
      startdate: "23-06-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "14",
      name: "Mark",
      surname: "Taimanov",
      email: "m.taimanov@gmail.com",
      phone: "0724311833",
      startdate: "13-05-2021",
      openforwork: true,
      usertype: 1
  },
  {
      id: "15",
      name: "Raul",
      surname: "Capablanca",
      email: "cuban@gmail.com",
      phone: "0734714832",
      startdate: "23-08-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "16",
      name: "Frank",
      surname: "Marshall",
      email: "f.marshall00@gmail.com",
      phone: "0724918231",
      startdate: "30-08-2021",
      openforwork: false,
      usertype: 0
  },
  {
      id: "17",
      name: "Phillip",
      surname: "Kennedy",
      email: "phillip.kennedy@gmail.com",
      phone: "0774913831",
      startdate: "05-04-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "18",
      name: "Patrick",
      surname: "Johnson",
      email: "johnson@gmail.com",
      phone: "0725918632",
      startdate: "16-03-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "19",
      name: "Donald",
      surname: "Dickson",
      email: "dondickson09@gmail.com",
      phone: "0616126770",
      startdate: "15-07-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "20",
      name: "Nick",
      surname: "Jackson",
      email: "N.jackson@gmail.com",
      phone: "0616726770",
      startdate: "30-06-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "21",
      name: "James",
      surname: "May",
      email: "J.May@gmail.com",
      phone: "0724318532",
      startdate: "21-05-2021",
      openforwork: true,
      usertype: 0
  },
  {
      id: "22",
      name: "Nora",
      surname: "Allen",
      email: "Nora.Allen@gmail.com",
      phone: "0724618513",
      startdate: "16-05-2021",
      openforwork: true,
      usertype: 3
  },
  {
      id: "23",
      name: "Clark",
      surname: "Kent",
      email: "Superma@gmail.com",
      phone: "0724912812",
      startdate: "15-05-2021",
      openforwork: true,
      usertype: 3
  },
  {
      id: "24",
      name: "Lex",
      surname: "Luther",
      email: "L.Luther@gmail.com",
      phone: "0824914832",
      startdate: "21-06-2021",
      openforwork: true,
      usertype: 1
  },
  {
      id: "25",
      name: "Alexander",
      surname: "Alekhine",
      email: "Executioner@gmail.com",
      phone: "0824915832",
      startdate: "23-11-2021",
      openforwork: false,
      usertype: 3
  },
  {
      id: "26",
      name: "Paul",
      surname: "Keres",
      email: "Keres.P@gmail.com",
      phone: "0824318832",
      startdate: "01-08-2021",
      openforwork: true,
      usertype: 2
  },
  {
      id: "27",
      name: "Garry",
      surname: "Kasparov",
      email: "KasparovChess@gmail.com",
      phone: "0824668552",
      startdate: "13-03-2021",
      openforwork: true,
      usertype: 2
  },
];

export const mockProjectData: Project[] = [
    {
      ProjectId: "0",
      Name: 'Skills Hunter',
      Description:
        'By using the latest innovations in AI and mobile platforms, we want to solve the problem of matching appropriate IT skills to available projects by creating an application that matches IT skills with appropriate IT projects',
      Owner: 'XYC Devs',
      Location: 'Hatfield',
      Skill: ['Angular', 'DotNet Core'],
      OpenForApplication: false,
    },
    {
      ProjectId: "1",
      Name: 'Smart Student Handbook',
      Description:
        'The smart student notebook consists out of an organizational mechanism to organize notes (Degree, Module, Year etc.). Notes are written in markup. Each note is accompanied by smart assist. Smart assist is a toolbar/widget on the side of the notes where it recommends content for the notes based on the content already written and shared to the community.',
      Owner: 'DCB Devs',
      Location: 'Durban',
      Skill: ['Docker', 'React', 'Vue', 'DotNet Core'],
      OpenForApplication: true,
    },
    {
      ProjectId: "2",
      Name: 'Augmented Reality Education System',
      Description:
        'EduGo will make use of Augmented Reality (AR) to present information to learners in a way that is interactive and fun. As an example, learners could leave the classroom and explore a sports field to find and learn about dinosaurs. These dinosaurs would appear on the learners’ mobile devices when they are in the vicinity. In another class, students may walk up to a table to see 3D models of multiple organs in the human body. Selecting an organ will reveal more information about it.',
      Owner: 'ABC Devs',
      Location: 'Cape Town',
      Skill: ['Docker', 'React', 'Vue', 'DotNet Core'],
      OpenForApplication: true,
    },
    {
      ProjectId: "3",
      Name: 'GeoCode – Virtual Global Treasure Hunt ',
      Description:
        'The GeoCode project is inspired by the popular Geocaching app. Instead of using physical geocaches, QR codes (called geocodes) will be hidden and can be scanned by participants to view the contents of the discovered geocode. The project will consist of creating a mobile application that will allow users to track, scan, and virtually view geocodes. The platform will also include features such as leaderboards, virtual collectable and trackable objects, as well as time trials including a sequence of geocodes that can be discovered.',
      Owner: 'TYS Devs',
      Location: 'Limpopo',
      Skill: ['Docker', 'Vue', '.Net Core'],
      OpenForApplication: true,
    },
  ];
  