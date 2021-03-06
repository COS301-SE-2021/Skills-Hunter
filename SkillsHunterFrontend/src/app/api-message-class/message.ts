//model classes
export interface skillModel{
    skillId: string;
    name: string;
    categoryId: string; 
    status: number;   
}

export interface categoryModel{
    categoryId: string;
    name: string;
    description: string;    
}

export interface userSkillModel{
    userSkillId: string;
    userId: string;
    skillId: string;
    weight: number;    
}


export interface collectionSkillModel{
    id: string;
    name: string;
    status: number;
}

//request classes
export interface removeSkillRequest{
    skillId: string;
}

export interface removeCategoryRequest{
    Id: string;
}

export interface addCategoryRequest{
    name: string;
    description: string;
}

//response classes

export interface getSkillsResponse{
    skills:skillModel[];
}

export interface removeSkillResponse{
    success: boolean;
    removed:skillModel;    
}

export interface getCategoriesResponse{
    category: categoryModel[];
}

export interface removeCategoryResponse
{
    Id: string;
    Name: string;
    Description: string;      
}

export interface addCategoryResponse{
    added: categoryModel
}

export interface getUserResponse{
    userId: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    startDate: string;
    openForWork: boolean;
    userType: number;
}

export interface getProjectSkillResponse{
    projectSkillId: string;
    skillId: string;
    name: string;
    weight: string;
}

export interface getProjectSkillCollectionResponse{
    projectSkillCollectionId: string;
    name: string;
    description: string;
    weight: string;
    skills: string; 
}

export interface getProjectSkillsResponse{
    skills: getProjectSkillResponse[];
    skillCollections: getProjectSkillCollectionResponse[];
}

export interface getProjectsResponse{
    projectId: string;
    name: string;
    description: string; 
    owner: string;
    location: string;
    openForApplication: boolean; 
    dateCreated: string;
    projectSkills: getProjectSkillsResponse;
}


export interface getSkillCollectionResponse{
    SkillCollectionId: string;
    Name: string;
    Description: string;
    Weight: number;
    Skills:collectionSkillModel[];
}