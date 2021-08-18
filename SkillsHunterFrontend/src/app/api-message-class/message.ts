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
    UserSkillId: string;
    UserId: string;
    SkillId: string;
    Weight: number;    
}

export interface userSkill{

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

export interface SkillRR{

}

export interface getProjectsResponse{
    ProjectId: string;
    Name: string;
    Description: string; 
    Owner: string;
    Location: string;
    OpenForApplication: boolean; 
    DateCreated: string;
    ProjectSkills: {
        SkillId: string;
        SkillName: string;
    }[]
}