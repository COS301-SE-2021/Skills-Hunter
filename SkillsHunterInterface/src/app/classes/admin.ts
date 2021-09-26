//Entity
export interface skill{
    skillId: string,
    name: string,
    status: number
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

//Responses

export interface getSkillsResponse{
    skills: skill[]
}

//Helpers
export interface getCategoryId{
    categoryId: string
}