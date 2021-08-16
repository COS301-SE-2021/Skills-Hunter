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