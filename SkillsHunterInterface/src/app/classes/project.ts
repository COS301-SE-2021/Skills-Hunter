import { getCategoryId, getSkillId } from "./admin";

//Entity
export class project{
    projectId: string;
    name: string;
    description: string;
    owner: string;
    location: string;
    openForApplications: boolean;
    dateCreated: Date;
    skills: projectSkillAndCollection;
}

export interface projectSkill{
    projectSkillId: string,
    skillId: string,
    name: string,
    weight: number
}

export interface projectSkillCollection{
    projectSkillCollectionId: string,
    name: string,
    description: string,
    weight: number,
    skills: projectSkill[]
}

//Request
export interface createProjectRequest{
    name: string,
    description: string,
    location: string,
    openForApplications: boolean,
    existingSkills: existingSkill[],
    newSkills: newSkill[],
    skillCollections: createCollection[]
}

export class inviteCandidateRequest{
    UserId: any;
    projectId: any;
    inviteeId: any;
    message: any;
}

//Response
export class matchingCandidate{
    percentage: number;
    userId: string;
    name: string;
    surname: string;
    email: string;
    matchingSkills: matchingSkill[];
}

export interface getApplications{
    percentage: number,
    userId: string,
    name: string,
    surname: string,
    email: string,
    applicationDate: Date
    matchingSkills: matchingSkill[]
}

export interface getInvitationResponse{
    invitationId: string,
    inviteeId: string,
    inviterId: string,
    projectId: string,
    inviteDate: Date
    status: number,
    message: string
}

//Helpers
export interface projectSkillAndCollection{
    skills: projectSkill[],
    skillCollections: projectSkillCollection[]
}

export interface existingSkill{
    skillId: string,
    weight: number
}

export interface newSkill{
    name: string,
    categories: getCategoryId[],
    weight: number
}

export interface createCollection{
    name: string,
    description: string,
    weight: number,
    skills: getSkillId[]
}

export interface matchingSkill{
    skillId: string,
    name: string,
    weight: number,
    percentage: number,
    yearsOfExperience: number
}