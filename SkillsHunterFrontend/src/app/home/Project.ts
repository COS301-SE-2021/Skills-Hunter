export interface Project{
	id: number;
	name: string;
	description: string;
	industry: string;
	owner: string;
	location: string;
	skills: string[];
	openForApplication: boolean;
}