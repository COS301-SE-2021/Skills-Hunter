//Entity
export interface skill{
    skillId: string,
    name: string,
    status: number
}

export class Category{
    categoryid: string;
    name: string;
    description: string;
}


//Requets
export interface createSkillRequest{
    name: string,
    categories: getCategoryId[]
}

export interface createCategoryRequest{
    name: string,
    description: string
}


export interface removeCategoryRequest
{
    categoryId:String
}


export interface removeSkillRequest
{
    skillId:String
}


export interface updateSkillRequest
{
    id: string,
    name: string,
    categoryId: string,
    status: number
}


export interface updateCategoryRequest
{
    id: string,
    name: string,
    description: string
}



export interface createSkillCollectionRequest
{   projectSkillCollectionId: string,
    name: string,
    description: string,
    weight: number,
    skills :getSkillId[]

}


//Responses

export interface getSkillsResponse{
    skills: skill[]
}

//Helpers
export interface getCategoryId{
    categoryId: string
}

export interface getSkillId{
    skillId: string
}