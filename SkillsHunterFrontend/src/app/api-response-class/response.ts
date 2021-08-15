//model classes
export interface skillModel{
    skillId: string;
    name: string;
    categoryId: string;
    status: number;   
}

//response classes
export interface getSkills{
    skills:skillModel[];
}