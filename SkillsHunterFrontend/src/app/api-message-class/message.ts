//model classes
export interface skillModel{
    skillId: string;
    name: string;
    categoryId: string;
    status: number;   
}

export interface categoryModel{
    CategoryId: string;
    Name: string;
    Description: string;    
}

//request classes
export interface removeSkillRequest{
    skillId: string;
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